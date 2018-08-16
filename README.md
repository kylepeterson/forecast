This is a web application showing the forecast for a given city. Right now it is set to Seattle.

To access the app go to the following url: https://kylepeterson.github.io/forecast/

With more time I would do the following:
* Enhance user experience by allowing the user to input any location they want.
* Enhance user experience by allowing the user to click on a specific day and see an hourly forecast for that day.
* Store my api key somewhere secure. Possibly in s3.
* Implement a proper loading state.
* If this app was part of a larger project I would make a more generic component than the TemperatureUnitSelector.
I made it so specific because for this app it only has one potential use case. But a toggle component like that can 
be applied in many more ways and could be useful in future projects.
* If I was using this app for a real product I would consider paying for more access to the OpenWeatherMap API.
Specifically for their 16 day daily endpoint. In order to translate the data from their free 5 day 3 hour endpoint
into daily data I had to use some complex logic which could be avoided with access to the second endpoint.
* The historical data endpoint would also be useful because the weather for the current day is flawed. I can't find
an accurate entire day forecast without access to the weather from earlier in the day.

If you are using a machine with npm and React installed you should be able to clone the repo and run ```npm run test```
to test the code or ```npm run build``` to build the code