import * as React from 'react';
import Vehicle, {Props as VehicleProps} from './Vehicle'
import { getVehicles } from '../services/gtfs';
import Map from './Map';

export interface Props {
  hideBuses: boolean,
  realTime: boolean
}

export interface State {
  vehicles: VehicleProps[]
}

class VehicleMap extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {vehicles: []};
    this.refreshVehicles();
    this.refreshVehicles = this.refreshVehicles.bind(this);
  }

  refreshVehicles() {
    getVehicles()
      .then(vehicles => this.setState({vehicles: vehicles}))
      .then(() => setTimeout(() => this.props.realTime ? this.refreshVehicles() : null, 1000));
  }

  componentWillReceiveProps(nextProps: Props) {
    if(nextProps.realTime && !this.props.realTime) {
      this.refreshVehicles();
    }
  }

  render() {
    const vehicles = !this.props.hideBuses ? this.state.vehicles: this.state.vehicles.filter(v => v.type != 3)

    return (
      <div>
        <Map>
          {vehicles.map(
            (vehicle: VehicleProps) => <Vehicle key={vehicle.id} {...vehicle} />
          )}
        </Map>
      </div>
    )
  }
}

export default VehicleMap;