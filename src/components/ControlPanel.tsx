import * as React from 'react';

export interface Props {
  hideBuses: boolean,
  hideStreetCars: boolean,
  hideMetro: boolean,
  hideFerries: boolean,
  realTime: boolean,
  handleHideBusesChange: React.ChangeEventHandler<HTMLInputElement>,
  handleRealTimeChange: React.ChangeEventHandler<HTMLInputElement>,
  handleHideStreetCarsChange: React.ChangeEventHandler<HTMLInputElement>,
  handleHideMetroChange: React.ChangeEventHandler<HTMLInputElement>,
  handleHideFerriesChange: React.ChangeEventHandler<HTMLInputElement>,
}

class ControlPanel extends React.Component<Props> {
  render() {
    return (
      <div className='control-panel'>
        <p>Change your destiny</p>
        <div>
          <label><input type="checkbox"
            onChange={this.props.handleHideBusesChange}
            checked={this.props.hideBuses}/> Hide buses</label>
        </div>
        {/* <div>
          <label><input type="checkbox"
            onChange={this.props.handleHideStreetCarsChange}
            checked={this.props.hideStreetCars}/> Hide trams, streetcars, light rail</label>
        </div>
        <div>
          <label><input type="checkbox"
            onChange={this.props.handleHideMetroChange}
            checked={this.props.hideMetro}/> Hide subway/metro</label>
        </div> */}
        <div>
          <label><input type="checkbox"
            onChange={this.props.handleHideFerriesChange}
            checked={this.props.hideFerries}/> Hide ferries</label>
        </div>
        <div>
          <label><input type="checkbox"
          onChange={this.props.handleRealTimeChange}
          checked={this.props.realTime}/> Real time</label>
        </div>
      </div>
    );
  }
}

export default ControlPanel;