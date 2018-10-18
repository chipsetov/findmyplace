import React, {Component} from "react";
import {Button, Row} from "react-materialize";
import ImageUploader from "react-images-upload";
import Gallery from 'react-grid-gallery';

class EditImages extends Component {
    constructor(props) {
        super(props);

        this.onDrop = this.onDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            picturesFromServer: [],
            pictures: [],
            visible: false,
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        //TODO: Send images to server
    }

    componentDidMount() {
        //TODO: Extract images from server
    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: pictureFiles,
        });
    }

    renderSendButton = () => {
        if (this.state.pictures.length > 0) {
            return (
                <Button className="grey darken-4" waves='light'>SEND TO SERVER</Button>
            )
        }
    };

    render() {

        const images = [
            {
                src: './img/avatar.png',
                thumbnail: './img/avatar.png',
                thumbnailWidth: 500,
                thumbnailHeight: 350
            },
            {
                src: './img/place.jpg',
                thumbnail: './img/place.jpg',
                thumbnailWidth: 500,
                thumbnailHeight: 350
            },
            {
                src: './img/restaurant.jpeg',
                thumbnail: './img/restaurant.jpeg',
                thumbnailWidth: 500,
                thumbnailHeight: 350
            }
            ];

        return (
            <React.Fragment>
                <Row>
                    <Gallery images={images}/>
                </Row>
                <ImageUploader
                    withIcon={false}
                    buttonText='ADD IMAGES'
                    withLabel={false}
                    onChange={this.onDrop}
                    withPreview
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
                {this.renderSendButton()}
            </React.Fragment>
        );
    }
}

export default EditImages;