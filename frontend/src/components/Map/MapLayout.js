import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer, Tooltip} from 'react-leaflet'
import {Link} from 'react-router-dom';
import '../../styles/Map.css';


export default class MapLayout extends Component {

    render() {
        const currentPosition = [this.props.currentLatitude, this.props.currentLongitude]
        const position = [this.props.latitude, this.props.longitude]
        const zoom = this.props.zoom
        return (
                <Map center={position} zoom={zoom}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={currentPosition}>
                        <Tooltip direction="top" permanent={true}>
                            This is your current location.
                        </Tooltip>
                    </Marker>
                    {this.props.items.map(place => (
                        <Marker key={place.name} position={[place.latitude, place.longitude]}>
                            <Tooltip direction="top">
                                {place.name}
                            </Tooltip>
                            <Popup>
                                <span> {place.name} </span>
                                <span> Free place: {place.countFreePlaces} </span>
                                <span> <Link to={`/place/${place.id}`}>Place page</Link> </span>
                            </Popup>
                        </Marker>
                    ))}
                </Map>
        )
    }
}