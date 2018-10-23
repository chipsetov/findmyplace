import React, {Component} from "react";
import {Button, Col, Row} from "react-materialize";
import ImageUploader from "react-images-upload";
import Gallery from 'react-grid-gallery';
import {deletePlaceImage, uploadPlaceImages} from "../../util/APIUtils";

class EditImages extends Component {
    constructor(props) {
        super(props);

        this.onDrop = this.onDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSelectImage = this.onSelectImage.bind(this);
        this.handleDeleteImages = this.handleDeleteImages.bind(this);
        this.state = {
            picturesFromServer: [],
            pictures: [],
            visible: false,
            preview: false,
            uploaderKey: 0,
        }
    };

    handleSubmit(event) {
        event.preventDefault();

        uploadPlaceImages(this.state.pictures, this.props.placeId)
            .then(response => {
                if (response.ok) {
                    this.setState({
                        pictures: [],
                        uploaderKey: this.state.uploaderKey + 1,
                    });
                    this.downloadImages();
                }
            })
    }

    downloadImages = () => {
        fetch("/places/download-images/" + this.props.placeId)
            .then(res => res.json())
            .then(
                (pictures) => {

                    const picturesFromServer = [];
                    pictures.map((image) => {
                        picturesFromServer.push({
                            imageUrl: image.imageUrl,
                            src: image.imageUrl,
                            thumbnail: image.imageUrl,
                            thumbnailWidth: 500,
                            thumbnailHeight: 350,
                        })
                    });

                    console.log(picturesFromServer.length);
                    this.setState({
                        picturesFromServer: picturesFromServer,
                    });
                }
            );
    };

    componentDidMount() {
        this.downloadImages();
    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: pictureFiles,
            preview: true,
        });
    }

    handleDeleteImages(event) {
        event.preventDefault();

        //Returns not deleted images
        const imagesAfterDelete = this.state.picturesFromServer.filter(image => {
            if(image.isSelected) {
                deletePlaceImage(image.imageUrl)
                    .then(result => {
                        if(result.ok)
                        return !result.ok;
                    });
            } else {
                return true;
            }
        });

        this.setState({
            picturesFromServer: imagesAfterDelete,
        })
    }

    renderSendButton = () => {
        if (this.state.pictures.length > 0) {
            return (
                <Button className="grey darken-4" waves='light' onClick={this.handleSubmit}>SEND TO SERVER</Button>
            )
        }
    };

    onSelectImage(index, image) {
        console.log("ok" + index);
        let images = this.state.picturesFromServer.slice();
        let img = images[index];
        if (img.hasOwnProperty("isSelected"))
            img.isSelected = !img.isSelected;
        else
            img.isSelected = true;

        this.setState({
            picturesFromServer: images,
        });
    };

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col className="grey lighten-2" s={12}>
                        <Gallery
                            images={this.state.picturesFromServer}
                            onSelectImage={this.onSelectImage}
                            preloadNextImage={false}/>
                    </Col>
                </Row>
                <ImageUploader key={this.state.uploaderKey}
                               withIcon={false}
                               buttonText='ADD IMAGES'
                               withLabel={false}
                               onChange={this.onDrop}
                               withPreview={this.state.preview}
                               imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                               maxFileSize={5242880}
                />
                <Button className="red" waves='light' onClick={this.handleDeleteImages}>DELETE SELECTED IMAGES</Button>
                {this.renderSendButton()}
            </React.Fragment>
        );
    }
}

export default EditImages;