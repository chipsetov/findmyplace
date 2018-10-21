import React, {Component} from "react";
import {Button, Col, Row} from "react-materialize";
import ImageUploader from "react-images-upload";
import Gallery from 'react-grid-gallery';
import {uploadPlaceImages} from "../../util/APIUtils";

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

        uploadPlaceImages(this.state.pictures, this.props.placeId)
            .then(response => {
                console.log(response);
            });
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
                <Button className="grey darken-4" waves='light' onClick={this.handleSubmit}>SEND TO SERVER</Button>
            )
        }
    };

    render() {
        console.log(this.state.pictures[0]);
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
                    <Col className="grey lighten-2" s={12}>
                        <Gallery images={images}/>
                    </Col>
                </Row>
                <ImageUploader withIcon={false}
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