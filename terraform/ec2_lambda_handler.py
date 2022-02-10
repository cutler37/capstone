import boto3
import os

region = 'us-east-1'
ec2 = boto3.client('ec2', region_name=region)
response = ec2.describe_instances(Filters=[
        {
            'Name': 'tag:Name',
            'Values': [
                os.environ['tag'],
            ]
        },
    ])

instances = []

for reservation in response["Reservations"]:
    for instance in reservation["Instances"]:
        instances.append(instance["InstanceId"])

def stop(event, context):
    ec2.stop_instances(InstanceIds=instances)
    print('stopped instances: ' + str(instances))

def start(event, context):
    ec2.start_instances(InstanceIds=instances)
    print('started  instances: ' + str(instances))

