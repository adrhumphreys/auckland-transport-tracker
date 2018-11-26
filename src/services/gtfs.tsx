import { find, filter } from 'lodash'
import { Props as VehicleProps } from '../components/Vehicle'
import routes from '../assets/routes.json';

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
    return response.entity.map(({vehicle}: any) => {
        // let route = find(routes, {route_id: vehicle.trip.route_id})
        // The bus people have uniqid - version as their id....
        let route = filter(routes, (route) => {
            return route.route_id.indexOf(vehicle.trip.route_id.split('-')[0]) > -1
        })[0]

        if(!route) {
            return {
                id: vehicle.vehicle.id,
                occupied: vehicle.occupancy_status !== 0,
                timestamp: vehicle.timestamp,
                latitude: vehicle.position.latitude,
                longitude: vehicle.position.longitude,
                shortName: null,
                longName: null,
                type: Math.floor(Math.random() * Math.floor(6)),
                routeId: null
            }
        }

        return {
            id: vehicle.vehicle.id,
            occupied: vehicle.occupancy_status !== 0,
            timestamp: vehicle.timestamp,
            latitude: vehicle.position.latitude,
            longitude: vehicle.position.longitude,
            shortName: route.route_short_name || '',
            longName: route.route_long_name || '',
            type: route.route_type || 6,
            routeId: vehicle.trip.route_id || ''
        }
    })
}