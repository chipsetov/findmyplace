import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import '../../styles/Map.css';


export default class MapLayout extends Component {

    render() {
        const position = [this.props.latitude, this.props.longitude]
        const zoom = this.props.zoom
        return (
                <Map center={position} zoom={zoom}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.props.items.map(place => (
                        <Marker key={place.name} position={[place.latitude, place.longitude]}>
                            <Popup>
                                {place.name}
                            </Popup>
                        </Marker>
                    ))}
                </Map>
        )
    }
}