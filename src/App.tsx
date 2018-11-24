import * as React from 'react';
import VehicleMap from './components/VehicleMap';
import ControlPanel from './components/ControlPanel';

export interface State {
    hideBuses: boolean,
    realTime: boolean
}

class App extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            hideBuses: true,
            realTime: false
        };
        this.handleHideBusesChange = this.handleHideBusesChange.bind(this)
        this.handleRealTimeChange = this.handleRealTimeChange.bind(this)
    }

    handleHideBusesChange() {
        this.setState({hideBuses: !this.state.hideBuses})
    }

    handleRealTimeChange() {
        this.setState({realTime: !this.state.realTime})
    }

    render() {
        return (
            <div className="app">
                <ControlPanel hideBuses={this.state.hideBuses}
                    realTime={this.state.realTime}
                    handleHideBusesChange={this.handleHideBusesChange}
                    handleRealTimeChange={this.handleRealTimeChange}
                     />
                <VehicleMap hideBuses={this.state.hideBuses}
                    realTime={this.state.realTime} />
            </div>
        );
    }
}

export default App;