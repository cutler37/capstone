#!/usr/bin/python3
from __future__ import division, print_function, unicode_literals
from datetime import datetime
from pathlib import Path
import logging
import json
import sys
import boto3
import botocore

path = Path(__file__).parent.absolute()
cf = boto3.client('cloudformation')
log = logging.getLogger('deploy.cf.create_or_update')

def main_menu():
        print("1. Create a new EC2 keypair (Required only once)")
        print("2. Customize settings (I don't want to use defaults!)")
        print("3. Deploy Pentest Environment Stack on AWS")
        print("4. Delete Pentest Environment Stack on AWS")
        print("5. Temporarily stop your Instances from running")
        print("6. Restart your stopped Instances")
        print("7. Quit script")
        
        options = input("\nChoose option >>> ")
        if options == '1':
            try:
                ec2 = boto3.resource('ec2')
                keypair_name = 'python_keypair'
                new_keypair = ec2.create_key_pair(KeyName=keypair_name)
                with open('./python_keypair.pem', 'w') as file:
                    file.write(new_keypair.key_material)
                print("EC2 Key-Pair fingerprint: " + new_keypair.key_fingerprint)
                print("EC2 Key-pair created: " + str(path) + "/python_keypair.pem\n")

                main_menu()   
            except botocore.exceptions.ClientError as ex:
                error_message = ex.response['Error']['Message']
                if error_message == 'The keypair \'python_keypair\' already exists.':
                    print("The \'python_keypair\' already exists in your AWS account.")
                    print("If you lost the key, go to the AWS console and delete it.")
                    print("After that, you could create a new key.\n")
                    main_menu()
        elif options == '2':
            print("If you want to use different VMs you can continue.")
            print("If you don't know or understand we recommend you use the defaults. (Kali, Metasploitable2, and Owasp Juice)\n")
            print("1: To use defaults and return to the main page")
            print("2: To continue and customize your VMs")
            VMoptions = input("\nEnter your selection: >>> ")
            if VMoptions == '1':
                main_menu()
            if VMoptions == '2':
                build_json()
        elif options == '3':
            try:
                if len(sys.argv) > 1:
                    main('Create',sys.argv[1:][0],sys.argv[1:][1],sys.argv[1:][2])
                else:
                    # If no values are entered on the commandline, just use default positioning
                    main('Create')
            except TypeError as ex:
                print("Some error happened. PLease try again")
                exit()
        elif options == '4':
            if len(sys.argv) > 1:
                main('Delete', sys.argv[1:][0],sys.argv[1:][1],sys.argv[1:][2])
            else:
                main('Delete')
        elif options == '5':
            print("This option will not delete your instances.")
            print("It will save your instance state and stop them, so you can restart them with option 6")
            print("Only if you have already launched instances in the past.")
            Stop_Start_Instances("StopInstances")
        elif options == '6':
            print("This option will restart stopped instances.")
            print("If you used option 5 to stop your instances use this option to restart them in their saved state.")
            Stop_Start_Instances("StartInstances")
        elif options == '7':
            print ("Closing. Thank you for testing our tool!")
            exit()
        else:
            print("Invalid Option. Please choose again!\n")
            main_menu()

def main(createDestroy, stack_name='pentest-stack', template = './template.yaml', parameters='./parameters.json'):
    'Update, create, or delete stack'
    template_data = _parse_template(template)
    parameter_data = _parse_parameters(parameters)

    params = {
        'StackName': stack_name,
        'TemplateBody': template_data,
        'Parameters': parameter_data,
    }

    ##### CREATE STACKS #####
    if createDestroy == 'Create':
        try:
            if _stack_exists(stack_name):
                print('Updating {}'.format(stack_name))
                stack_result = cf.update_stack(**params)
                waiter = cf.get_waiter('stack_update_complete')
            else:
                print('Creating {}'.format(stack_name))
                stack_result = cf.create_stack(**params)
                waiter = cf.get_waiter('stack_create_complete')
            print("Waiting for stack to be ready...")
            print("It should take no more than 3 minutes. Please wait.")
            waiter.wait(StackName=stack_name)
        except botocore.exceptions.ClientError as ex:
            error_message = ex.response['Error']['Message']
            if error_message == 'No updates are to be performed.':
                print("No changes")
            else:
                raise
        except botocore.exceptions.WaiterError as e:
            print("\nDo you have the python_keypair.pem on your AWS Accounts?")
            print("Without the key, the deployment won't work")
            print("Choose option \'1\' to generate and upload a new keypair.\n")
            if len(sys.argv) > 1:
                main('Delete', sys.argv[1:][0],sys.argv[1:][1],sys.argv[1:][2])
            else:
                main('Delete')
            main_menu()             
        else:
            print(json.dumps(
                cf.describe_stacks(StackName=stack_result['StackId']),
                indent=2,
                default=json_serial
            ))
    ##### DELETE STACKS #####
    elif createDestroy == 'Delete':
        try:
            print('Deleting {}'.format(stack_name))
            print('Please wait...')
            stack_result = cf.delete_stack(StackName=stack_name)
            waiter = cf.get_waiter('stack_delete_complete')
            waiter.wait(StackName=stack_name)
            print('Delete of stack '+ stack_name + ' completed.\n')
        except botocore.exceptions.ClientError as ex:
            print('ERROR Deleting Stack:')
            print(ex)

def Stop_Start_Instances(stopStart):
    region = 'us-east-1'
    ec2 = boto3.client('ec2', region_name=region)
    response = ec2.describe_instances(Filters=[
            {
                'Name': 'tag:Pentest',
                'Values': [
                   "pentest-stack",
                ]
            },
        ])

    instances = []

    for reservation in response["Reservations"]:
        for instance in reservation["Instances"]:
            instances.append(instance["InstanceId"])

    if stopStart == "StopInstances":
        ec2.stop_instances(InstanceIds=instances)
        print('stopped instances: ' + str(instances))

    if stopStart == "StartInstances":
        ec2.start_instances(InstanceIds=instances)
        print('Started instances: ' + str(instances))

def build_json():
    attackVMAMI = 'ami-06fd113e1286dd166'
    attackVMSize = 't2.micro'
    vulnVMAMI = 'ami-03ea1121e147b22b9'
    storage = '30'

    #SELECT ATTACK VM 
    print('\nWe offer 3 different VMs that you can use to attack your vulnerable VMs.')
    print('However, each type of VM has different costs. Price estimates as of 2/25/2022.\n')
    print('1. Kali Linux (Free Software, Tested, & Recommended)')
    print('2. Parrot Security OS (about $0.05 per hour for software)')
    print('3. Pentoo (about $0.07 per hour for software)')
    attackVMOptions = input("\nSelect which VM you prefer to use: >>> ")
    
    if attackVMOptions == '1':
        attackVMAMI = 'ami-06fd113e1286dd166'
    elif attackVMOptions == '2':
        attackVMAMI = 'ami-03b4813c9831470f4'
    elif attackVMOptions == '3':
        attackVMAMI = 'ami-0a25944a8fcadcdc3'
    else: 
        print('Invalid input. Exiting.')
        exit()
    
    #SELECT SIZE OF ATTACK MACHINE
    print('\nAmazon offers various sizes of machines in which to run your VMs.')
    print('The larger the machine the faster you can process data.')
    print('However, the larger the machine the more expensive it is to run per hour. Price estimates as of 2/25/2022.\n')
    print('1. t2.micro (1 vCPU 1 GiB) {estimated price: $0.013 per hour, unless on free tier}')
    print('2. t2.small (1 vCPU 2 GiB) [Recommended] {estimated price: $0.023 per hour}')
    print('3. t2.medium (2 vCPU 4 GiB) [Recommended] {estimated price: $0.052 per hour}')
    print('4. t2.large (2 vCPU 8 GiB) {estimated price: $0.0928 per hour}')
    attackVMSizeOptions = input("\nSelect which VM size you prefer to use: >>> ")
    if attackVMSizeOptions == '1':
        attackVMSize = 't2.micro'
    elif attackVMSizeOptions == '2':
        attackVMSize = 't2.small'
    elif attackVMSizeOptions == '3':
        attackVMSize = 't2.medium'
    elif attackVMSizeOptions == '4':
        attackVMSize = 't2.large'
    else: 
        print('Invalid input. Exiting.')
        exit()

    #SELECT STORAGE SIZE TO CONNECT TO YOUR ATTACK VM
    print('\nEnter in the storage size to attach to your attack VM.')
    print('Remember the more storage you use the more it costs you.')
    print('In addition, Depending on the different VM types you selected.')
    print('You will be required to add a minumium amount of memory to an instance.')
    print('For instance Kali Linux you have to have atleast 12GiB, Parrot is 30GiB, and Pentoo is 20GiB.')
    print('If you are on the free tier you get to use about 30GiB to use a month, anything above 30GiB is about $0.10 per GiB.')
    print('Price estimate 2/25/2022.\n')
    storageAmount = input("\nHow much memory (GiB) would you like to attach: >>> ")
    while storageAmount.isdigit()==False:
        storageAmount = input("Enter a positive number: ")
        if storageAmount.isdigit()==False:
            print("Invalid input. ")
        else:
            continue

    #SELECT VULNERABLE MACHINE TO HACK
    print('\nAmazon offers various vulnerable machines to hack.')
    print('Search Google for more information considering each VM.\n')
    print('1. OWASP Juice Box')
    print('2. Metasploitable 2 [Recommended]')
    print('3. DVWA-Application-Demo (Untested, but popular)')
    print('4. Metasploitable 3')
    vulnVMAMIOptions = input("\nSelect which Vulnerable machine you would like to hack: >>> ")
    
    if vulnVMAMIOptions == '1':
        vulnVMAMI = 'ami-0cea98c1668042d67'
    elif vulnVMAMIOptions == '2':
        vulnVMAMI = 'ami-03ea1121e147b22b9'
    elif vulnVMAMIOptions == '3':
        vulnVMAMI = 'ami-0631939d90aa6e6d1'
    elif vulnVMAMIOptions == '4':
        vulnVMAMI = 'ami-0b49e298407cf1e17'
    else: 
        print('Invalid input. Exiting.')
        exit()

    data = [
         {
            "ParameterKey": "EnvironmentName",
            "ParameterValue": "Pentest"
        },
        {
            "ParameterKey": "VpcCIDR",
            "ParameterValue": "172.20.0.0/16"
        },
        {
            "ParameterKey": "PublicSubnetCIDR",
            "ParameterValue": "172.20.1.0/24"
        },
        {
            "ParameterKey": "KeyPairName",
            "ParameterValue": "python_keypair"
        },
        {
            "ParameterKey": "AttackVmType",
            "ParameterValue": attackVMSize
        },
        {
            "ParameterKey": "AttackImageId",
            "ParameterValue": attackVMAMI
        },
         {
            "ParameterKey": "VulnVmType",
            "ParameterValue": "t2.micro"
        },
        {
            "ParameterKey": "VulnImageId",
            "ParameterValue": vulnVMAMI
        },
        # THIS NEEDS TO BE ADDED ALSO MAYBE ADD ANOTHER VULN IMAGE OPTION"storage": storage
    ]

    json_string = json.dumps(data)
    
    #export to file 
    with open ('customized_parameters.json','w') as outfile:
        outfile.write(json_string)
    
    print('\nThe file \'customized_parameters.json\' has been created.')
    print('Re-start the script passing it as a parameter, followed by option \'3\':')
    print('\'python3 ./oneclick.py anyStackName ./template.yaml ./customized_parameters.json')
    exit()

def _parse_template(template):
    with open(template) as template_fileobj:
        template_data = template_fileobj.read()
    cf.validate_template(TemplateBody=template_data)
    return template_data


def _parse_parameters(parameters):
    with open(parameters) as parameter_fileobj:
        parameter_data = json.load(parameter_fileobj)
    return parameter_data


def _stack_exists(stack_name):
    stacks = cf.list_stacks()['StackSummaries']
    for stack in stacks:
        if stack['StackStatus'] == 'DELETE_COMPLETE':
            continue
        if stack_name == stack['StackName']:
            return True
    return False


def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, datetime):
        serial = obj.isoformat()
        return serial
    raise TypeError("Type not serializable")

if __name__ == '__main__':
    print("================== Welcome ===================")
    main_menu()

# Next iteration and final steps:
    # - Update front-end with screenshots and walkthrough of the script;
    # - Update script and template to include storage option as a paramater;
    # - Add VNC instructions on the README file;
    # - Print only Offensive IP, Vulnerable IP, and Tutorial IP. Not sure if we should describe the whole stack