import { Injectable } from '@angular/core';
import { FORECAST_KEY, FORECAST_ROOT } from '../constants/constants';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WeatherService {
    constructor(private jsonp: Jsonp) { }

    getCurrentLocation(): Observable<any> {
        if (navigator.geolocation) {
            return Observable.create(observer => {
                navigator.geolocation.getCurrentPosition(pos => {
                    observer.next(pos);
                }),
                    err => {
                        return Observable.throw(err);
                    }
            });
        } else {
            return Observable.throw("Geolocation is not available");
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
            });
    }

}