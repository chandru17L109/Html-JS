import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class FormComponent extends Component {
    constructor() {
        super();
        this.arr1 = ["Chennai", "Bangalore", "Hyderabad", "Pune", "Kochi"];
        this.arr2 = ["US", "Non US"];
        this.state = {
            currentRadio: '', presentSelect: '', validated: false, disablesubmit: true, activatesubmit: 0,
            nameValid: false, namecheck: false,
            idValid: false, idcheck: false,
            projectValid: false, projectCheck: false,
            uploadValid: false, uploadCheck: false,
            commentsValid: false, commentscheck: false,
            count: 0,checkboxcount:0,checkboxValid:false
        };

    }
    onshoreOrOffshore(event) {
        if (event.target.value === "Offshore") {
            var optionList1 = this.arr1.map((option, i) => {
                return <option value={option}>{option}</option>;
            })

            this.setState({ presentSelect: optionList1 });
            console.log(this.state.presentSelect);
        }
        if (event.target.value === "Onshore") {
            var optionList2 = this.arr2.map((option, i) => {
                return <option value={option}>{option}</option>;
            })
            console.log(optionList2);
            this.setState({ presentSelect: optionList2 });
        }
    }
    AssociateName(event) {
        var data = event.target.value;
        const validname = new RegExp('[a-zA-Z\s]{5,30}');
        if (!validname.test(data)) {
            this.setState({ nameValid: false })
        }
        else {
            this.setState({ nameValid: true });
            this.setState({ namecheck: true });
            console.log(this.state.namecheck);
        }
        this.setbuttonenable()
    }
    AssociateId(event) {
        var data = event.target.value;
        const validname = new RegExp('^[0-9]{6}$');
        if (!validname.test(data)) {
            this.setState({ idValid: false })
        }
        else {
            this.setState({ idValid: true });
            this.setState({ idcheck: true })
            console.log(this.state.idcheck);
        }
        this.setbuttonenable()
    }
    AssociateProject(event) {
        var data = event.target.value;
        const validname = new RegExp('[a-zA-Z]{12}');
        if (!validname.test(data)) {
            this.setState({ projectValid: false })
        }
        else {
            this.setState({ projectValid: true });
            this.setState({ projectCheck: true })
            console.log(this.state.projectCheck);
        }
        this.setbuttonenable()
    }
    comment(event) {
        var data = event.target.value;
        console.log(data);
        if (data) {
            this.setState({ commentsValid: true })
            this.setState({ commentscheck: true });
            console.log(this.state.commentscheck);
        }
        else {
            this.setState({ commentsValid: false });

        }
        this.setbuttonenable()
    }
    uploadFile(event) {
        if (event.target.value) {
            this.setState({ uploadValid: true });
            this.setState({ uploadCheck: true })
            console.log(this.state.uploadCheck);
        }
        else {
            this.setState({ uploadValid: false });

        }
        this.setbuttonenable()
    }
    setbuttonenable() {
        if ((this.state.checkboxValid === true)&&(this.state.namecheck === true) && (this.state.idcheck === true) && (this.state.projectCheck === true) && (this.state.uploadCheck === true) && (this.state.commentscheck === true)) {
            this.setState({ disablesubmit: false });
            console.log("done");
        }

    }
    countCheckbox(event)
    {
        if(event.target.checked)
        {
            var currentvalue=this.state.checkboxcount;
            this.setState({checkboxcount:currentvalue+1});
        }
        if(this.state.checkboxcount<5)
        {
            this.setState({checkboxValid:false})
        }
        else
        {
            this.setState({checkboxValid:true})
        }
    }
    render() {


        return (

            <Form style={{ marginTop: "20px" }}>
                <h1>Form Validation <span style={{ color: "red" }}>*</span></h1>

                <Form.Group>
                    <Form.Control onChange={this.AssociateName.bind(this)} required type="text" placeholder="Associate Name" />
                    <Form.Text hidden={this.state.nameValid} style={{ color: "red" }}>
                        Please enter Associate Name
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Control onChange={this.AssociateId.bind(this)} type="number" placeholder="Associate Id" />
                    <Form.Text hidden={this.state.idValid} style={{ color: "red" }}>
                        Please enter Associate Id
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Control onChange={this.AssociateProject.bind(this)} type="text" placeholder="Project Id" />
                    <Form.Text hidden={this.state.projectValid} style={{ color: "red" }}>
                        Please enter Project Id
                    </Form.Text>
                </Form.Group>


                <Form.Group>
                    <input onChange={this.onshoreOrOffshore.bind(this)} type="radio" id="Offshore" name="OffOn" value="Offshore" />
                    <label htmlFor="Offshore">&nbsp;Offshore</label> &nbsp;
                    <input onChange={this.onshoreOrOffshore.bind(this)} type="radio" id="Onshore" name="OffOn" value="Onshore" />
                    <label htmlFor="Onshore">&nbsp;Onshore</label>
                </Form.Group>


                <Form.Group>
                    <Form.Control as="select" custom>
                        <option value="0">Select Location</option>
                        {this.state.presentSelect}
                    </Form.Control>
                    <Form.Text hidden={true} style={{ color: "red" }}>
                        Please select Location
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Row>
                        <Col><input type="checkbox" onChange={this.countCheckbox.bind(this)} id="HTML5" name="HTML5" value="HTML5" /><label htmlFor="HTML5">&nbsp;HTML5,CSS3,JS</label></Col>
                        <Col><input type="checkbox" onChange={this.countCheckbox.bind(this)} id="Angular8" name="Angular8" value="Angular8" /><label htmlFor="Angular8">&nbsp;Angular 8</label></Col>
                        <Col><input type="checkbox" onChange={this.countCheckbox.bind(this)} id="ExpressJS" name="ExpressJS" value="ExpressJS" /><label htmlFor="ExpressJS">&nbsp;Express JS</label></Col>
                    </Row>
                    <Row>
                        <Col><input type="checkbox" onChange={this.countCheckbox.bind(this)} id="SASS" name="SASS" value="SASS" /><label htmlFor="SASS">&nbsp;SASS</label></Col>
                        <Col><input type="checkbox" onChange={this.countCheckbox.bind(this)} id="ReactJS" name="ReactJS" value="ReactJS" /><label htmlFor="ReactJS">&nbsp;React JS</label></Col>
                        <Col><input type="checkbox" onChange={this.countCheckbox.bind(this)} id="NodeJS" name="NodeJS" value="NodeJS" /><label htmlFor="NodeJS">&nbsp;Node JS</label></Col>
                    </Row>
                    <Row>
                        <Col><input type="checkbox" onChange={this.countCheckbox.bind(this)} id="ES5" name="ES5" value="ES5" /><label htmlFor="ES5">&nbsp;ES5,ES6,ES7 ...</label></Col>
                        <Col><input type="checkbox" onChange={this.countCheckbox.bind(this)} id="VeuJS" name="VeuJS" value="VeuJS" /><label htmlFor="VeuJS">&nbsp;Veu JS</label></Col>
                        <Col><input type="checkbox" onChange={this.countCheckbox.bind(this)} id="MangoDB" name="MangoDB" value="MangoDB" /><label htmlFor="MangoDB">&nbsp;Mango DB</label></Col>
                    </Row>
                    <Row>
                        <Col><input type="checkbox" onChange={this.countCheckbox.bind(this)} id="Bootstrap4" name="Bootstrap4" value="Bootstrap4" /><label htmlFor="Bootstrap4">&nbsp;Bootstrap 4</label></Col>
                        <Col><input type="checkbox" onChange={this.countCheckbox.bind(this)} id="TypeScript" name="TypeScript" value="TypeScript" /><label htmlFor="TypeScript">&nbsp;TypeScript</label></Col>
                        <Col></Col>
                    </Row>
                    <Form.Text hidden={this.state.checkboxValid} style={{ color: "red" }}>
                        Please select Min 5 Skills
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <input onChange={this.uploadFile.bind(this)} required type="file" />
                    <Form.Text hidden={this.state.uploadValid} style={{ color: "red" }}>
                        Please upload Profile Picture
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Control onChange={this.comment.bind(this)} as="textarea" rows={3} placeholder="Comments" />
                    <Form.Text hidden={this.state.commentsValid} style={{ color: "red" }}>
                        Please enter comments
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="submit" disabled={this.state.disablesubmit}>
                        Submit
                    </Button> &nbsp;
                    <Button variant="danger" type="reset">
                        Reset
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}

export default FormComponent;