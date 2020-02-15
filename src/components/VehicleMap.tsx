import * as React from 'react';
import Vehicle, {Props as VehicleProps} from './Vehicle'
import { getVehicles } from '../services/gtfs';
import Map from './Map';

export interface Props {
  hideBuses: boolean,
  hideStreetCars: boolean,
  hideMetro: boolean,
  hideFerries: boolean,
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
      .then(() => setTimeout(() => this.props.realTime ? this.refreshVehicles() : null, 5000))
  }

  componentWillReceiveProps(nextProps: Props) {
    if(nextProps.realTime && !this.props.realTime) {
      this.refreshVehicles()
    }
  }

  render() {
    const {
      hideBuses,
      hideMetro,
      hideStreetCars,
      hideFerries,
    } = this.props
    
    let filters: Number[] = []

    if (hideBuses) {
      filters.push(3)
    }

    if (hideMetro) {
      filters.push(0)
    }

    if (hideStreetCars) {
      filters.push(1)
    }

    if (hideFerries) {
      filters.push(4)
    }

    const vehicles = this.state.vehicles.filter(v => filters.indexOf(v.type) < 0 && v.type != null)
    // const vehicles = this.state.vehicles.filter(v => v.type != null)

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