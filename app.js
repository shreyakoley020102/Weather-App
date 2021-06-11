const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=02e242ef9fee0c3a2d7c8330fa5c3049&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      res.write("<p>The weather is currently " + weatherDescription + "<p>");
      res.write(
        "<h1>The temperature in Paris is " + temp + " degree Celsius.</h1>"
      );
      res.send();
      // const weatherDescription = weatherData.weather[0].description;
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running at port 3000");
});
