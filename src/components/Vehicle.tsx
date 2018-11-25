import * as React from 'react';
import { Marker } from 'react-map-gl'

export interface Props {
    id: string,
    occupied: boolean,
    timestamp: number,
    latitude: number,
    longitude: number,
    shortName: string,
    longName: string,
    type: number,
    routeId: string,
}

class Vehicle extends React.Component<Props> {
    getIcon() {
        switch (this.props.type) {
            case 0:
                return '🚙';
            case 1:
                return '🚂';
            case 2:
                return '🚈';
            case 3:
                return '🚌';
            case 4:
                return '⛴';
            case 5:
                return '🚅';
        }

        return '🚜';
    }

    render() {
        return (
            <Marker
                className="map-marker"
                latitude={this.props.latitude} 
                longitude={this.props.longitude}>
                {this.getIcon()}
            </Marker>
        )
    }
}

export default Vehicle;