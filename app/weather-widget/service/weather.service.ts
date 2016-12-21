import { Injectable } from '@angular/core';
import { FORECAST_KEY, FORECAST_ROOT } from '../constants/constants';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WeatherService {
    constructor(private jsonp: Jsonp) { }

    getCurrentLocation(): [number,number] {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                console.log("Position: ", pos.coords.latitude, ", ", pos.coords.longitude); // TODO: REMOVE
                return [pos.coords.latitude, pos.coords.longitude];
            },
            err => {
                console.error("Unable to get position - ", err.message);
            });
        } else {
            console.error("Geolocation is not available");
            return [0,0];
        }
    }

    getCurrentWeather(lat: number, long: number): Observable<any> {
        const URL = FORECAST_ROOT + FORECAST_KEY + "/" + lat + "," + long;
        const queryParams = "?callback=JSONP_CALLBACK";
        
        return this.jsonp.get(URL + queryParams)
            .map(data => data.json())
            .catch(err => {
                console.error("Error getting results from weather - ", err);
                return Observable.throw(err.json())
            })
    }
    
 }