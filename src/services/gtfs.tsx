import Vehicle, { Props as VehicleProps } from '../components/Vehicle'

const API_KEY = process.env.AUCKLAND_GTSF_KEY || '';

export function getVehicles(): Promise<VehicleProps[]> {

    const options = {
        headers: {
            "Ocp-Apim-Subscription-Key": API_KEY
        }
    }

    const vehiclesJson = fetch(
            'https://api.at.govt.nz/v2/public/realtime/vehiclelocations',
            options
        )
        .then(response => response.json())
        .catch(err => console.log('Issue with GTFS:' + err));

    const routesJson = fetch(
            'https://api.at.govt.nz/v2/gtfs/routes',
            options
        )
        .then(response => response.json())
        .catch(err => console.log('Issue with GTFS:' + err));

    const vehicles = Promise.all([routesJson, vehiclesJson]).then((values) => processResponse(values[1], values[0]));
        
    return vehicles;
}

// expects json blob from the response
function processResponse(vehiclesJson: any , routesJson: any): VehicleProps[] {
    const routes = routesJson.response.map((route: any) => {
        return {
            id: route.route_id,
            type: route.route_type,
            shortName: route.route_short_name,
            longName: route.route_long_name
        };
    });

    const vehicles = vehiclesJson.response.entity.map(({vehicle}: any) => {
        const route = routes.filter(({ id }: { id: string }) => {
            if (vehicle.trip == undefined || vehicle.trip.route_id == undefined) {
                return false;
            }

            return id == vehicle.trip.route_id
        })[0]

        if (!route) {
            return {
                id: vehicle.vehicle.id,
                occupied: vehicle.occupancy_status,
                timestamp: vehicle.timestamp,
                latitude: vehicle.position.latitude,
                longitude: vehicle.position.longitude,
                shortName: null,
                longName: null,
                type: null,
                routeId: null
            }
        }

        return {
            id: vehicle.vehicle.id,
            occupied: vehicle.occupancy_status,
            timestamp: vehicle.timestamp,
            latitude: vehicle.position.latitude,
            longitude: vehicle.position.longitude,
            shortName: route.shortName,
            longName: route.longName || '',
            type: route.type || 6,
            routeId: route.id || ''
        }
    })

    return vehicles
}