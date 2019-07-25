import React, { Component } from 'react';
import config from './config'
import createMapOptions from './MapOptions'
import GoogleMapReact from 'google-map-react';

class Map extends Component {
    static defaultProps = {
        center: {
            lat: 40.73,
            lng: -73.93
        },
        zoom: 7
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div className={'map-area'}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: config.googleApiKey }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    options={createMapOptions()}
                >
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;