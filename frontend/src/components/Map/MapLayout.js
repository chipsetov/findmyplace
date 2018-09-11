import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import '../../styles/Map.css';



export default class MapLayout extends Component {
    state = {
        lat: 50.6219427,
        lng: 26.2493254,
        zoom: 15,
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <div id="mapid">
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            This app starts here.
                        </Popup>
                    </Marker>
                </Map>
            </div>

        )
    }
}