import React, {Component} from 'react';
import { Row, Input, Button } from 'react-materialize';
import AvatarEditor from 'react-avatar-editor';
import {setUserAvatar} from '../../util/APIUtils';


class SetAvatar extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            file: "../img/place.jpg"
        }
    }

    handleChange(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.file);

        const setAvatarRequest = {
            file: this.state.file
        };

        setUserAvatar(this.state.file)
            .then(response => {
                window.Materialize.toast(response.message, 7000);
            })
    }

    render() {
        return (
            <div>
                <AvatarEditor
                    image={this.state.file}
                    width={300}
                    height={300}
                    color={[255, 255, 255, 0.6]} // RGBA
                />
                <Row>
                    <Input
                        type="file"
                        label="Choose file"
                        onChange={e => this.handleChange("file", e.target.files[0])}
                    />
                </Row>
                <Row>
                    <Button
                        type="submit"
                        label="Choose file"
                        onClick={this.handleSubmit}
                    >
                        Save
                    </Button>
                </Row>
            </div>
        );
    }
}

export default SetAvatar;