import React, { Component } from 'react'

export default class FormHandson extends Component {
    constructor() {
        super();
        this.AssociateName = React.createRef();
        this.AssociateId = React.createRef();
        this.ProjectId = React.createRef();
        this.Comments = React.createRef();
        this.UpdateFile = React.createRef();
        this.location = React.createRef();
        this.AssociateNamePattern = "[a-zA-Z][a-zA-Z ]+[a-zA-Z]";
        this.state = { Border1 : "form-control" , Border2 : "form-control", Border3 : "form-control" , Border4 : "form-control-file border", Border5 : "form-control", 
                       submitform : "button", selectskill : "", Aname: "",  Aid: "",   Pid: "",  comment: "",  submitStatus: "" ,
                       updatefile : "", optionsList : [""], radiooption : [], selectratio: "",selectlocation : "",
                       offshore: ['Chennai', 'Bangalore', 'Hyderabad', 'Pune' , 'Kochi'], onshore : ['US','Non US']
                    }
    }
    //For Checkbox selected items 
    onChange(e) {
        let options = this.state.optionsList;
        let index;
        if (e.target.checked) {
          options.push(e.target.value)
        } else {
          index = options.indexOf(e.target.value)
          options.splice(index, 1)
        }
        this.setState({ optionsList: options})
        console.log(options);
      }

    //Click on the offshore radiobutton to display offshore locations in next dropdown option
      offshoreRadiobutton(e){
        let choice = []
        if(e.target.checked){
            choice = this.state.offshore; 
        }else{
            choice = [];
        }
        this.setState({radiooption : choice})
    }
    //Click on the onshore radiobutton to display onshore locations in next dropdown option
    onshoreRadiobutton(e){
        let choice = []
        if(e.target.checked){
            choice = this.state.onshore; 
        }else{
            choice = [];
        }
        this.setState({radiooption : choice})
    }
    
    //Validating the input data when the form is submitted
      formSubmit = (event) =>{
        event.preventDefault();
        const Asso_name = this.AssociateName.current.value;
        const Asso_id = this.AssociateId.current.value;
        const Pro_id = this.ProjectId.current.value;
        const radioselect = this.state.radiooption;
        const SelectSkill = this.state.optionsList.length;
        const updateprofile = this.UpdateFile.current.value;
        const Comment = this.Comments.current.value;
        const Locationselect = this.location.current.value;

        console.log("form-data", Asso_name, Asso_id, Pro_id, Comment, SelectSkill, updateprofile, radioselect, Locationselect);
     
            if (Asso_name === "") {
                this.setState({ Aname: "Please enter Associate Name", Border1 :"form-control errorborder" })
            }else if (!Asso_name.match(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/) || (Asso_name.length < 5 || Asso_name.length >30)) {
                this.setState({ Aname: "Accepts Alphabets, space & Min 5 to Max 30 Char", Border1:"form-control errorborder" })
            }else { this.setState({ Aname : "", Border1 : "form-control defaultborder" }) }

            if (Asso_id === "") {
                this.setState({ Aid: "Please enter Associate Id", Border2 :"form-control errorborder" })
            }else if (!Asso_id.match(/^[1-9]{1}[0-9]{5}$/)) {
                this.setState({ Aid: "Invalid Associate Id", Border2 :"form-control errorborder" })
            }else { this.setState({ Aid: "" , Border2 :"form-control defaultborder"}) }

            if (Pro_id === "") {
                this.setState({ Pid: "Please enter Project Id", Border3 :"form-control errorborder" })
            }else if (!Pro_id.match(/^[a-zA-Z0-9]{12}$/)) {
                this.setState({ Pid: "Invalid Associate Id", Border3 :"form-control errorborder" })
            }else { this.setState({ Pid: "", Border3 :"form-control defaultborder" }) }

            if (!Comment.match(/^[A-Za-z1-9]{1}[A-Za-z0-9 .'?!,@$#-_\n\r]/)) {
                this.setState({ comment: "Please enter Comments", Border5 :"form-control errorborder" })
            }else { this.setState({ comment: "", Border5 :"form-control defaultborder" }) }

            if (updateprofile === ""){
                this.setState({updatefile : "Please upload Profile Picture", Border4 :"form-control-file errorborder"})
            }else{this.setState({updatefile : "", Border4 :"form-control-file defaultborder"})}

            if(radioselect.length === 0){
                this.setState({selectratio : "Please select offshore/onshore"})
            }else{this.setState({selectratio : ""})}

            if(radioselect.length === 0){
                this.setState({selectlocation : "Please select offshore/onshore to select LocatioN"})
            }else if(Locationselect === "select Location"){
                this.setState({selectlocation : "Please select Location"})
            }else{this.setState({selectlocation : ""})}

            if (SelectSkill < 5){
                this.setState({selectskill : "Please select Min 5 skills"})
            }else{this.setState({selectskill : ""})}

            //After checking the condition, reset the input fields when the form is submitted
            if ((Asso_name.length >= 5 && Asso_name.length <= 30) && (Asso_id.length === 6) && (Pro_id.length === 12) && (Comment.length > 0) && (SelectSkill >= 5) && (updateprofile !== "") && (radioselect.length > 0) && (Locationselect !== "select Location")) {
                  this.setState({ Aname: "", Aid: "", Pid: "", comment: "" , selectskill : "" ,updatefile : "", selectratio : "", selectlocation:"",optionsList:[], radiooption:[],submitStatus: 'Form Submitted Successfully', submitform : "reset",
                                 Border1 : "form-control" , Border2 : "form-control", Border3 : "form-control" , Border4 : "form-control-file border", Border5 : "form-control" })
                  event.target.reset();
            }
    }

    ResetForm() {
        this.setState({Aname: "", Aid: "", Pid: "", selectskill : "", comment: "", updatefile : "" , selectratio : "", selectlocation : "" ,
         submitStatus: "", optionsList:[], radiooption:[], Border1 : "form-control" , Border2 : "form-control", Border3 : "form-control" , Border4 : "form-control-file border", Border5 : "form-control" })
    }

    closemessage(){
        this.setState({submitStatus : ""})
    }

    render() {
       //Drop option to select location after radio button is checked
        var optionList = this.state.radiooption.map((option,i)=>{
            return (<option key={i} value={option}>{option}</option>)
        })
        
        // An alert to display after the form is submitted successfully
        if (this.state.submitStatus) {
            var submitStatus = (
                <div class="alert alert-success" role="alert">
                    {this.state.submitStatus}
                    <button type="button" className="closebutton float-right" onClick={this.closemessage.bind(this)}>x</button>
                </div>
            )
        }
        return (
            <div className="container-align">
                {submitStatus}
                <h1>From Validation <span className="star-important">&#42;</span></h1>
                <form onSubmit={this.formSubmit}>
                    <div className="form-group Error-msg">
                        <input type="text" ref={this.AssociateName} className={this.state.Border1} id="AssociateName" placeholder="Associate Name" autoComplete="off" />
                        <span> {this.state.Aname} </span>
                    </div>
                    <div className="form-group Error-msg">
                        <input type="text" ref={this.AssociateId} className={this.state.Border2} id="AssociateId" placeholder="Associate Id" autoComplete="off" />
                        <span>{this.state.Aid}</span>
                    </div>
                    <div className="form-group Error-msg">
                        <input type="text" ref={this.ProjectId} className={this.state.Border3} id="ProjectId" placeholder="Project ID" autoComplete="off" />
                        <span>{this.state.Pid}</span>
                    </div>
                    <div className="form-group">
                        <div className="form-check-inline">
                            <label className="form-check-label" htmlFor="radio1">
                                <input type="radio" className="form-check-input" id="radio" name="radio" onChange={this.offshoreRadiobutton.bind(this)} value={"Offshore"} /> Offshore
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label" htmlFor="radio2">
                                <input type="radio" className="form-check-input" id="radio" name="radio" onChange={this.onshoreRadiobutton.bind(this)}  value={"Onshore"} /> Onshore
                            </label>
                        </div>
                        <br></br><span className="Error-msg">{this.state.selectratio}</span>
                    </div>
                    
                    <div className="form-group">
                        <select className="form-control hide" ref={this.location} id="sel1" name="sellist1">
                          <option selected disabled hidden>select Location</option>
                               {optionList}
                        </select>
                        <span className="Error-msg">{this.state.selectlocation}</span>
                    </div>
                    <table className="table borderless">
                    <tbody>
                       <tr>
                           <td>
                               <div className="form-check-inline">
                                 <label className="form-check-label" htmlFor="check1">
                                   <input type="checkbox" className="form-check-input" id="check1" name="Check1" value={"HTML5,CSS3,JS"} onChange={this.onChange.bind(this)} />HTML5,CSS3,JS
                                 </label>
                               </div>
                          </td>
                           <td>
                               <div className="form-check-inline">
                                  <label className="form-check-label" htmlFor="check2">
                                     <input type="checkbox" className="form-check-input" id="check2" name="Check2" value={"Angular 8"} onChange={this.onChange.bind(this)}/>Angular 8
                                  </label>
                                </div>
                           </td>
                           <td>
                                <div className="form-check-inline">
                                    <label className="form-check-label" htmlFor="check3">
                                        <input type="checkbox" className="form-check-input" id="check3" name="Check3" value={"Express JS"} onChange={this.onChange.bind(this)}/>Express JS
                                    </label>
                                </div>
                           </td>
                       </tr>
                       <tr>
                           <td>
                                <div className="form-check-inline">
                                    <label className="form-check-label" htmlFor="check4">
                                        <input type="checkbox" className="form-check-input" id="check4" name="Check4" value={"SASS"} onChange={this.onChange.bind(this)} />SASS
                                    </label>
                                </div>
                           </td>
                                <td>
                                <div className="form-check-inline">
                                    <label className="form-check-label" htmlFor="check5">
                                        <input type="checkbox" className="form-check-input" id="check5" name="Check5" value={"React JS"} onChange={this.onChange.bind(this)}/>React JS
                                    </label>
                                </div>
                           </td>
                           <td>
                                <div className="form-check-inline">
                                    <label className="form-check-label" htmlFor="check6">
                                        <input type="checkbox" className="form-check-input" id="check6" name="Check6" value={"Node JS"} onChange={this.onChange.bind(this)}/>Node JS
                                    </label>
                                </div>
                           </td>
                       </tr>
                       <tr>
                           <td>
                                <div className="form-check-inline">
                                    <label className="form-check-label" htmlFor="check7">
                                        <input type="checkbox" className="form-check-input" id="check7" name="Check7" value={"ES5,ES6,ES7..."} onChange={this.onChange.bind(this)}/>ES5,ES6,ES7...
                                    </label>
                                </div>
                           </td>
                           <td>
                                <div className="form-check-inline">
                                    <label className="form-check-label" htmlFor="check8">
                                        <input type="checkbox" className="form-check-input" id="check8" name="Check8" value={"Veu JS"} onChange={this.onChange.bind(this)}/>Veu JS
                                    </label>
                                </div>
                           </td>
                           <td>
                                <div className="form-check-inline">
                                    <label className="form-check-label" htmlFor="check9">
                                        <input type="checkbox" className="form-check-input" id="check9" name="Check9" value={"Mango DB"} onChange={this.onChange.bind(this)}/> Mango DB
                                    </label>
                                </div>
                           </td>
                       </tr>
                       <tr>
                           <td>
                                <div className="form-check-inline">
                                    <label className="form-check-label" htmlFor="check10">
                                        <input type="checkbox" className="form-check-input" id="check10" name="Check10" value={"Bootstrap 4"} onChange={this.onChange.bind(this)}/>Bootstrap 4
                                    </label>
                                </div>
                           </td>
                           <td>
                                <div className="form-check-inline">
                                    <label className="form-check-label" htmlFor="check11">
                                        <input type="checkbox" className="form-check-input" id="check11" name="Check11" value={"TypeScript"} onChange={this.onChange.bind(this)}/>TypeScript
                                    </label>
                                </div>
                           </td>
                       </tr>
                    </tbody>
                    <span className="Error-msg">{this.state.selectskill}</span>
                    </table>
                    <div className="form-group">
                        <label htmlFor="file">Upload Profile</label>
                        <input type="file" ref={this.UpdateFile} className={this.state.Border4} name="file" />
                        <span className="Error-msg">{this.state.updatefile}</span>
                    </div>
                    <div className="form-group  Error-msg">
                        <textarea ref={this.Comments} className={this.state.Border5} rows="4" id="comment" name="text" placeholder="Comments" autoComplete="off" ></textarea>
                        <span>{this.state.comment}</span>
                    </div>
                    <input type="submit" className="btn btn-primary m-2"/>
                    <button type="reset" className="btn btn-danger m-2" onClick={this.ResetForm.bind(this)}>Reset</button>
                </form>
            </div>
        )
    }
}
