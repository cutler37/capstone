import React, {useState} from 'react';

function SelectionForm () {
 
    const [formValue, setFormValue] = useState({
        offVM: "Kali Linux",
        vulVM: "Metasploitable2",
        size: "t2.micro",
    });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name)
        console.log(value)
        setFormValue((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
      };

    const {offVM, vulVM,region,size,subnet} = formValue


    function download (event) {
      const configJSONfile = {
        "size":size,
        "off":offVM,
        "vuln":vulVM,
      }
      event.preventDefault();
      // Prepare the file
      let output ;
      console.log(output)
      // Download it
      const fileData = JSON.stringify(configJSONfile);
      const blob = new Blob([fileData], {type: "text/plain"});
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'variables.json';
      link.href = url;
      link.click();
    }
  
    
    return (
      <>
      <form>
          <label>I) What Offensive Security Virtual Machine would you like to launch to use in your online Virtual Environment?</label><br></br>
          <input type="radio" name="offVM" value="Parrot Security OS" onChange={handleChange}/>Parrot Security OS<br/>
          <input type="radio" name="offVM" value="Kali Linux" onChange={handleChange}/>Kali Linux [recommended]<br/>
          <input type="radio" name="offVM" value="BackBox" onChange={handleChange}/>BackBox<br/>
          <br></br>
          <label>II) What Vulnerable Virtual Machine would you like to launch to use in your online Virtual Environment?</label><br></br>
          <input type="radio" name="vulVM" value="Metasploitable3" onChange={handleChange}/>Metasploitable 3<br/>
          <input type="radio" name="vulVM" value="Metasploitable2" onChange={handleChange}/>Metasploitable 2 [Recommended]<br/>
          <input type="radio" name="vulVM" value="Earth" onChange={handleChange}/>Earth<br/>
          <br></br>
          <label>IV) What size do you want you're Offensive Virtual Machine to be? Remember the larger the size the more AWS charges you. We won't charge anything. t2.micro is under free tier; however, it may not run like you want.</label><br></br>
          <input type="radio" name="size" value="t2.micro" onChange={handleChange}/>t2.micro (1 vCPU 1 GiB)<br/>
          <input type="radio" name="size" value="t2.medium" onChange={handleChange}/>t2.medium (2 vCPU 4 GiB) [Recommended]<br/>
          <input type="radio" name="size" value="t2.large" onChange={handleChange}/>t2.large (2 vCPU 8 GiB)<br/>
          <input type="radio" name="size" value="t2.xlarge" onChange={handleChange}/>t2.xlarge (4 vCPU 16 GiB)<br/>
          <br></br>
          
      </form>
      <button onClick={download}>
        Create custom variables.json
      </button>
    </>
    );
    
}

export default SelectionForm;