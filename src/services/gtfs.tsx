import * as _ from 'lodash'
import {Props as VehicleProps} from '../components/Vehicle'
import routes from '../assets/routes';

const API_KEY = process.env.AUCKLAND_GTSF_KEY || '';

export function getVehicles(): Promise<VehicleProps[]> {

    const options = {
        headers: {
            "Ocp-Apim-Subscription-Key": API_KEY
        }
    }

    const vehicles = fetch(
            'https://api.at.govt.nz/v2/public/realtime/vehiclelocations',
            options
        )
        .then(response => response.json())
        .then(json => processResponse(json));
        
    vehicles.catch(err => console.log('Issue with GTFS:' + err))
    
    return vehicles;
}

// expects json blob from the response
function processResponse({response}: any): VehicleProps[] {
    //get the routes in ye old memory
    // const routes = JSON.parse(routeJson)
    

    return response.entity.map(({vehicle}: any) => {
        let route = _.find(routes, {route_id: vehicle.trip.route_id})

        return {
            id: vehicle.vehicle.id,
            occupied: vehicle.occupancy_status !== 0,
            timestamp: vehicle.timestamp,
            latitude: vehicle.position.latitude,
            longitude: vehicle.position.longitude,
            shortName: route.route_short_name || '',
            longName: route.route_long_name || '',
            type: route.route_type || '',
            routeId: vehicle.trip.route_id || ''
        }
    })
}