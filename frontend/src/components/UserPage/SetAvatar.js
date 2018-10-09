import React, {Component} from 'react';
import { Row, Input, Button } from 'react-materialize';
import AvatarEditor from 'react-avatar-editor';
import {getAvatar, setUserAvatar} from '../../util/APIUtils';


class SetAvatar extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            avatar: ""
        };

    }

    componentDidMount() {
        // getAvatar()
        //     .then(response => {
        //         if(response) {
        //             this.setState({
        //                 avatar: response
        //             })
        //         }
        //     })
    }

    handleChange(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit(event) {
        event.preventDefault();

        const image = this.editor.getImageScaledToCanvas();
        const dataURL = image.toDataURL();
        const file = this.toBlobFile(dataURL);

        setUserAvatar(file)
            .then(response => {
                if(response.ok) {
                    window.Materialize.toast("Avatar changed", 3000);
                    this.props.handleAvatarUpdated();
                }
            });
    }

    toBlobFile(dataURL) {
        const blobBin = atob(dataURL.split(',')[1]);
        const array = [];
        for(let i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
        }
        const file = new Blob([new Uint8Array(array)], {type: 'image/png'});

        return file;
    }

    setEditorRef = (editor) => this.editor = editor;

    render() {
        return (
            <div>
                <AvatarEditor
                    ref={this.setEditorRef}
                    image={this.state.avatar}
                    width={300}
                    height={300}
                    color={[255, 255, 255, 0.6]}
                />
                <Row>
                    <Input
                        type="file"
                        label="Choose file"
                        onChange={e => this.handleChange("avatar", e.target.files[0])}
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