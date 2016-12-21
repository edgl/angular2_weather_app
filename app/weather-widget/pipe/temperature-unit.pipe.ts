import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tempUnit'
})

export class TemperatureUnitPipe implements PipeTransform {
    transform(temp: number, unitType: string) {
        switch(unitType) {
            case "C":
                return temp * 9/5 + 32;
            default:
                return temp;
        }
    }
 }