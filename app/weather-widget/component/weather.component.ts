import { Component } from '@angular/core';
import { WeatherService } from '../service/weather.service';

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})

export class WeatherComponent {
    constructor(private service: WeatherService) {
        this.service.getCurrentLocation()
            .subscribe(position => {
                let pos = [position.coords.latitude, position.coords.longitude];
                this.service.getCurrentWeather(pos[0], pos[0])
                    .subscribe(weather => console.log(weather),
                    error => console.error(error));
            },
            err => console.error(err));
    }
}