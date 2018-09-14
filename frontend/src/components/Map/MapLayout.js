import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import '../../styles/Map.css';


export default class MapLayout extends Component {

    state = {
        zoom: 15,
    }

    render() {
        console.log('items', this.props.items);
        const position = [this.props.latitude, this.props.longitude]
        return (
            <div id="mapid">
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.props.items.map(place => (
                        <Marker position={[place.latitude, place.longitude]}>
                            <Popup key={place.name}>
                                {place.name}
                            </Popup>
                        </Marker>
                    ))}
                </Map>
            </div>

        )
    }
}