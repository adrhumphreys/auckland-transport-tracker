import * as React from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN || '';

export interface State {
  viewport: {
    width: string|number,
    height: string|number,
    latitude: number,
    longitude: number,
    zoom: number
  }
}

class Map extends React.Component<any, State> {
  constructor(props: any) {
    super(props)

    // auckland 36.8485° S, 174.7633° E
    this.state = {
      viewport: {
        width: '100%',
        height: '100%',
        latitude: -36.8485,
        longitude: 174.7633,
        zoom: 10
      }
    };
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        className="main-map"
        mapStyle='mapbox://styles/mapbox/basic-v9'
        onViewportChange={(viewport: any) => this.setState({viewport})}
      >
        {this.props.children}
        <div className="map-controls">
          <NavigationControl onViewStateChange={() => null} onViewportChange={(viewport: any) => this.setState({viewport})} />
        </div>
      </ReactMapGL>
    );
  }
}

export default Map