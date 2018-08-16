import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  date: PropTypes.string,
  high: PropTypes.number,
  low: PropTypes.number,
  weather: PropTypes.string,
  iconUrl: PropTypes.string,
  metric: PropTypes.bool,
};

const defaultProps = {
  date: 'Today',
  high: 0,
  low: 0,
  weather: 'Sunny',
  metric: true,
};

class WeatherSnippet extends React.Component {
  renderTemperature(temp) {
    const unit = this.props.metric ? `\u2103` : `\u2109`;
    return `${Math.round(temp)}${unit}`
  }

  render() {
    return (
      <div className="weather-snippet">
        <header className="weather-snippet__date">
          {this.props.date}
        </header>
        <div className="weather-snippet__icon">
          <img src={this.props.iconUrl} alt={this.props.weather} />
        </div>
        <div className="weather-snippet__temps">
          <div className="weather-snippet__temps__high">
            {this.renderTemperature(this.props.high)}
          </div>
          <div className="weather-snippet__temps__low">
            {this.renderTemperature(this.props.low)}
          </div>
        </div>
        <div className="weather-snippet__weather">
          {this.props.weather}
        </div>
      </div>
    );
  }
}

WeatherSnippet.propTypes = propTypes;
WeatherSnippet.defaultProps = defaultProps;

export default WeatherSnippet;
