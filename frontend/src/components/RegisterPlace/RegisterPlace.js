import React, { Component } from 'react';
import {Row, Input, Button} from 'react-materialize';


class RegisterPlace extends Component {
    render() {
        return(
            <div className="container">
                <Row>
                    <Input s={12} label="Place name"/>
                </Row>
                <Row>
                    <Input s={12} label="Address"/>
                    <Input name="on" type="time" label="Open time" onChange={function(e, value) {}} />
                    <Input name="on" type="time" label="Close time" onChange={function(e, value) {}} />
                </Row>
                <Row>
                    <Input s={12} type='select' label="Place type" defaultValue='1'>
                        <option value='1'>Option 1</option>
                        <option value='2'>Option 2</option>
                        <option value='3'>Option 3</option>
                    </Input>
                </Row>
                <Row>
                    <Input type="textarea" s={12} label="Description"/>
                </Row>
                <Button className="grey darken-4" waves="light">
                    Register place
                </Button>
            </div>
        );
    }
}

export default RegisterPlace;