import * as React from 'react';

export interface Props {
  hideBuses: boolean,
  realTime: boolean,
  handleHideBusesChange: React.ChangeEventHandler<HTMLInputElement>,
  handleRealTimeChange: React.ChangeEventHandler<HTMLInputElement>,
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