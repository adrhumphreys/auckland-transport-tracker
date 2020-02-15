import * as React from 'react';
import VehicleMap from './components/VehicleMap';
import ControlPanel from './components/ControlPanel';

export interface State {
    hideBuses: boolean,
    realTime: boolean,
    hideStreetCars: boolean,
    hideMetro: boolean,
    hideFerries: boolean,
}

class App extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            hideBuses: true,
            hideStreetCars: true,
            hideMetro: true,
            hideFerries: true,
            realTime: false,
        };
        this.handleHideBusesChange = this.handleHideBusesChange.bind(this)
        this.handleHideStreetCarsChange = this.handleHideStreetCarsChange.bind(this)
        this.handleHideMetroChange = this.handleHideMetroChange.bind(this)
        this.handleHideFerriesChange = this.handleHideFerriesChange.bind(this)
        this.handleRealTimeChange = this.handleRealTimeChange.bind(this)
    }

    handleHideBusesChange() {
        this.setState({hideBuses: !this.state.hideBuses})
    }

    handleHideStreetCarsChange() {
        this.setState({hideStreetCars: !this.state.hideStreetCars})
    }

    handleHideMetroChange() {
        this.setState({hideMetro: !this.state.hideMetro})
    }

    handleHideFerriesChange() {
        this.setState({hideFerries: !this.state.hideFerries})
    }

    handleRealTimeChange() {
        this.setState({realTime: !this.state.realTime})
    }

    render() {
        const { hideBuses, hideMetro, hideStreetCars, realTime, hideFerries } = this.state
        
        return (
            <div className="app">
                <ControlPanel 
                    hideBuses={hideBuses}
                    hideMetro={hideMetro}
                    hideStreetCars={hideStreetCars}
                    hideFerries={hideFerries}
                    realTime={realTime}
                    handleHideBusesChange={this.handleHideBusesChange}
                    handleRealTimeChange={this.handleRealTimeChange}
                    handleHideStreetCarsChange={this.handleHideStreetCarsChange}
                    handleHideMetroChange={this.handleHideMetroChange}
                    handleHideFerriesChange={this.handleHideFerriesChange}
                     />
                <VehicleMap
                    hideBuses={hideBuses}
                    hideMetro={hideMetro}
                    hideStreetCars={hideStreetCars}
                    hideFerries={hideFerries}
                    realTime={realTime} />
            </div>
        );
    }
}

export default App;