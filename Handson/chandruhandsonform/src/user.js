import React, { Component } from 'react'
import {decode as base64_decode, encode as base64_encode} from 'base-64';

export default class User extends Component {
    constructor() {
        super();
        this.Name = React.createRef();
        this.Email = React.createRef();
        this.College = React.createRef();
        this.StudentId = React.createRef();
        this.FileName = React.createRef();
        // this.Password = React.createRef();

    }

      formSubmit = (event) =>{
        event.preventDefault();

        const name = this.Name.current.value;
        const email = this.Email.current.value;
        const college = this.College.current.value;
        const studentId = this.StudentId.current.value;
        const fileName = this.FileName.current.value;
        let temp = fileName.split("\\")
        const filename = temp[temp.length -1]
        const password = base64_encode(this.Email.current.value);

        // const password = this.Password.current.value;
     
        console.log("form-data", name, email, college, studentId, filename, password);

        fetch(`https://prod-24.centralindia.logic.azure.com/workflows/78d6df0ed1384ee0b7d04918f1a32b85/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=i6gXuS7-5_fFVf-0u8M4UfymINDULCMifsscfN5cPKM`, {
            method : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({Name : name, Email : email, College : college, StudentId : studentId , FileName : fileName, Password :password}),
        })
        .then(data =>data.json()) 
        .then(res=>{
            console.log("RESPONSE",res);
            if(res.status == 200){
                alert("Your details have been submitted successfully")
            }else{
                alert(res.message)
            }
        })

    }

    display(){
         fetch(`https://prod-24.centralindia.logic.azure.com/workflows/78d6df0ed1384ee0b7d04918f1a32b85/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=i6gXuS7-5_fFVf-0u8M4UfymINDULCMifsscfN5cPKM`, {
            headers: { 'Content-Type': 'application/json' },
        })
        .then(data =>data.json()) 
        .then(res=>{
            console.log(res)
        })
    }


    render() {
        return (
            <div className="container-align">
                <form onSubmit={this.formSubmit}>
                    <div className="form-group">
                    <label htmlFor="file">Name</label><br></br>
                        <input type="text" ref={this.Name} id="AssociateName" placeholder="Name"  />
                    </div>
                    <div className="form-group">
                    <label htmlFor="file">Email</label><br></br>
                        <input type="email" ref={this.Email} id="Email" placeholder="Email"  />
                        
                    </div>
                    <div className="form-group">
                    <label htmlFor="file">College</label><br></br>
                        <input type="text" ref={this.College} id="College" placeholder="College"  />
                    </div>
                    <div className="form-group">
                    <label htmlFor="file">StudentId</label><br></br>
                        <input type="text" ref={this.StudentId} id="StudentId" placeholder="StudentId"  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="file">FileName</label><br></br>
                        <input type="file" ref={this.FileName} name="file" />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="file">Password</label><br></br>
                        <input type="password" ref={this.Password} id="Password" placeholder="Password"  />
                    </div> */}
                  
                    <input type="submit" className="btn btn-primary m-2"/>

                </form>
                <button  className="btn btn-info m-2" onClick={this.display.bind(this)}>Display User</button>
            </div>
        )
    }
}
