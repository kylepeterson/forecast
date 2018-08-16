import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  metric: PropTypes.bool,
  onToggle: PropTypes.func,
};

const defaultProps = {
  metric: true,
};

class TemperatureUnitSelector extends Component {
  constructor(props) {
    super(props);

    this.handleMetricClick = this.handleMetricClick.bind(this);
    this.handleImperialClick = this.handleImperialClick.bind(this);
  }

  handleMetricClick() {
    if(!this.props.metric) {
      this.props.onToggle();
    }
  }

  handleImperialClick() {
    if (this.props.metric) {
      this.props.onToggle();
    }
  }

  render() {
    const metric_class_names = classnames({
      'temperature-unit-selector__metric': true,
      'temperature-unit-selector__option': true,
      'temperature-unit-selector__selected': this.props.metric,
    });

    const imperial_class_names = classnames({
      'temperature-unit-selector__imperial': true,
      'temperature-unit-selector__option': true,
      'temperature-unit-selector__selected': !this.props.metric,
    });

    return (
      <div className="temperature-unit-selector">
        <div
            className={metric_class_names}
            onClick={this.handleMetricClick}
        >
          {`\u2103`}
        </div>
        <div
            className={imperial_class_names}
            onClick={this.handleImperialClick}
        >
          {`\u2109`}
        </div>
      </div>
    );
  }
}

TemperatureUnitSelector.propTypes = propTypes;
TemperatureUnitSelector.defaultProps = defaultProps;

export default TemperatureUnitSelector;
