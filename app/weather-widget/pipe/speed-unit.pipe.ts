import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
    name: 'speedUnit'
})

export class SpeedUnitPipe implements PipeTransform {
    transform(speed: number, unitType: string) {
        switch(unitType) {
            case "mph":
                const miles = speed * 1.6;
                return miles + "kph";
            default:
                const kph = speed / 1.6;
                return kph + "mph";
        }
    }
}