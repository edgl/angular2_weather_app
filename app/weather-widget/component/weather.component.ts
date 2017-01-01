import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { Weather } from '../model/weather';
import { Location } from '../model/location';
import { WEATHER_COLORS } from '../constants/constants';

declare var Skycons: any; // workaround because we don't 
                          // have typescript def for Skycons js library

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})

export class WeatherComponent implements OnInit {

    pos: Position;
    weatherData = new Weather(null, null, null, null, null);
    location = new Location(null, null);
    currentSpeedUnit = "kph";
    currentTempUnit = "C";
    locationName: string = null;
    icons = new Skycons();

    constructor(private service: WeatherService) { }

    ngOnInit() {
        this.getWeatherByCurrentLocation();
    }

    getWeatherByCurrentLocation() {
        this.service.getCurrentLocation()
            .subscribe(position => {
                this.pos = position;
                this.getCurrentWeather();
                this.getLocationName();
            },
            err => console.error(err));
    }

    getCurrentWeather() {
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                this.weatherData.temp = weather["currently"]["temperature"];
                this.weatherData.wind = weather["currently"]["windSpeed"];
                this.weatherData.humidity = weather["currently"]["humidity"];
                this.weatherData.icon = weather["currently"]["icon"];
                this.weatherData.summary = weather["currently"]["summary"];
                console.log("Weather: ", this.weatherData);
                this.setIcon();
            },
            error => console.error(error));
    }

    getLocationName() {
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(loc => {
                this.location.city = loc["results"][0]["address_components"][2]["short_name"];
                this.location.state = loc["results"][0]["address_components"][5]["short_name"];
                                    
                console.log("Location Name: " + this.location); 
            },      
            err => console.error(err));
    }

    toggleUnits() {
        this.toggleSpeedUnits();
        this.toggleTempUnits();
    }

    toggleSpeedUnits() {
        if(this.currentTempUnit == "F") {
            this.currentTempUnit = "C";
        } else {
            this.currentTempUnit = "F";
        }
    }

    toggleTempUnits() {
        if(this.currentSpeedUnit == "kph") {
            this.currentSpeedUnit = "mph";
        } else {
            this.currentSpeedUnit = "kph";
        }
    }

    setIcon() {
        this.icons.add("icon", this.weatherData.icon);
        this.icons.play();
    }

    setStyles(): Object {
        if(this.weatherData.icon) {
            this.icons.color = WEATHER_COLORS[this.weatherData.icon]["color"];
            return WEATHER_COLORS[this.weatherData.icon];
        } else {
            this.icons.color = WEATHER_COLORS["default"]["color"];
            return WEATHER_COLORS["default"];
        }
    }
}