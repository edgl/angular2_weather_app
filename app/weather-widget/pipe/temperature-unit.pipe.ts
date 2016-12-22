import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tempUnit'
})

export class TemperatureUnitPipe implements PipeTransform {
    transform(temp: number, unitType: string) {
        switch(unitType) {
            case "F":
                return (temp - 32) / 1.8;
            default:
                return temp;
        }
    }
 }