import React from 'react';
import WeatherSnippet from '../../components/WeatherSnippet';
import TemperatureUnitSelector from '../../components/TemperatureUnitSelector';
import '../../styles/weather-app.css';

// TODO Enable user input of any location
const CITY = 'Seattle';
const COUNTRY = 'us';

//TODO Store as a secret in s3
const API_KEY = '7f9c5c959d2b01c132739ed2a3024805';
const FORECAST_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast';
const URL = `${FORECAST_ENDPOINT}?q=${CITY},${COUNTRY}&appid=${API_KEY}`;

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayToDetails: {},
      loading: true,
      metric: true,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.fetchForecast();
  }

  fetchForecast() {
    const currentHour = new Date().getHours();
    // Get 32 results for next 4 days (4 * 8) and add results for remainder of today (24 - now) / 3
    const count = Math.round(32 + (24 - currentHour) / 3);
    const url = `${URL}&units=${this.state.metric ? 'metric' : 'imperial'}&cnt=${count}`;

    fetch(url)
      .then(results => results.json())
      .then(results => {
        const hourlyResults = results.list;
        // Create map of day to all hourly results for that day
        const dayToDetails = hourlyResults.reduce(this.parseHourlyToDaily, {});
        this.setState(() => ({ dayToDetails, loading: false }));
      });
  }

  // Takes an hourly result and assigns it to the appropriate day in the dayToDetails map
  parseHourlyToDaily(dayToDetails, hourlyResult) {
    const date = new Date(hourlyResult['dt'] * 1000);
    const key = `${date.getDate()}/${date.getMonth() + 1}`;
    const details = {
      ...hourlyResult['main'],
      weather: hourlyResult['weather'][0], // first weather result in primary according to docs
    };

    if (!(key.toString() in dayToDetails)) {
      dayToDetails[key] = [];
    }

    dayToDetails[key].push(details);
    return dayToDetails;
  }

  getDailyMinTemp(details) {
    return Math.min(...details.map((details) => details['temp_min']));
  }

  getDailyMaxTemp(details) {
    return Math.max(...details.map((details) => details['temp_max']));
  }

  // Returns the most frequent weather type for an array of weather details for a day
  getDayWeatherMode(dayDetails) {
    const weatherCounts = dayDetails.reduce((counts, detail) => {
      const weather = detail.weather;

      if (!(weather['id'] in counts)) {
        counts[weather['id']] = {
          count: 1,
          icon: weather['icon'].replace('n', 'd'), // Show day time logo
          description: weather['description'],
        };
      }

      counts[weather['id']]['count']++;
      return counts;
    }, {});

    const sorted = Object.values(weatherCounts)
                         .sort((a, b) => weatherCounts[b] - weatherCounts[a]);
    return sorted[0];
  }

  handleToggle() {
    this.setState((state) => {
      return { metric: !state.metric, loading: true }
    }, this.fetchForecast);
  }

  // TODO Implement a better loading state
  renderLoadingState() {
    return '';
  }

  renderSnippets() {
    const dayToDetails = this.state.dayToDetails;
    const snippets = Object.keys(dayToDetails).map((date) => {
      const dayDetails = dayToDetails[date];
      const dayWeather = this.getDayWeatherMode(dayDetails);
      const iconUrl = `http://openweathermap.org/img/w/${dayWeather['icon']}.png`;
      return <WeatherSnippet
          date={date}
          low={this.getDailyMinTemp(dayDetails)}
          high={this.getDailyMaxTemp(dayDetails)}
          weather={dayWeather['description']}
          iconUrl={iconUrl}
          metric={this.state.metric}
          key={date}
      />
    });
    return <div className="weather-app__snippets">{snippets}</div>;
  }

  render() {
    return (
      <div className="weather-app">
        <header className="weather-app__header">
          <h1 className="weather-app__header__title">{`${CITY}`} Weather</h1>
          <TemperatureUnitSelector
              metric={this.state.metric}
              onToggle={this.handleToggle}
          />
        </header>
        <div className="weather-app__container">
          {this.state.loading ? this.renderLoadingState() : this.renderSnippets()}
        </div>
      </div>
    );
  }
}

export default WeatherApp;
