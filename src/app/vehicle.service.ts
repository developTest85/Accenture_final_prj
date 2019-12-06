import { Injectable } from '@angular/core';
import { Vehicle } from './shared/vehicle.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: "root" })
export class VehicleService {

    edit = new Subject<boolean>();

    editMode = new Subject<boolean>();

    index = new Subject<number>();

    vehicles: Vehicle[] = [
        new Vehicle('Fiat Punto', "NA-853RS", 2007, 3800.30, "https://pic02.caraffinity.it/52/77/big/fiat-punto-img-20190111040338.jpg"),
        new Vehicle('T-Cross', "NA-175TY", 2018, 4100.30, "https://immagini.alvolante.it/sites/default/files/styles/anteprima_lunghezza_640_jpg/public/serie_auto_galleria/2019/02/volkswagen_t-cross_ant.png?itok=BLaEjVvh"),
        //new Vehicle('Hyunday i10', "NA-074LP", 2008, 3800.30, "https://www.gelestatic.it/thimg/Qnj1VHyKX82DIa5lc_iB5J8U5d0=/fit-in/960x540/filters:format(webp)/https%3A//www.lastampa.it/image/contentid/policy%3A1.37409896%3A1567494128/2612864_1567492526.jpg%3Ff%3Ddetail_558%26h%3D720%26w%3D1280%26%24p%24f%24h%24w%3De7668c4"),
    ]

    constructor(private http: HttpClient) { }

    getVehicles() {
        this.http.get('assets/mock-vehicles.json').toPromise().then(response => {
            console.log(response)
        });
        return this.vehicles;
    }

    getVehicle(index: number) {
        console.log("Index get vehicle: " + index);
        return this.vehicles[index];
    }

    addVehicle(vehicle: Vehicle) {
        vehicle.date = new Date()
        console.log(vehicle.date);
        this.vehicles.push(vehicle);
    }

    getIndex(vehicle: Vehicle) {
        return this.vehicles.indexOf(vehicle);
    }

    updateVehicle(index: number, newVehicle: Vehicle) {
        newVehicle.date = this.vehicles[index].date;
        this.vehicles[index] = newVehicle;
        return this.vehicles;
    }

    deleteVehicle(index: number) {
        this.vehicles.splice(index, 1);
        return this.vehicles;
    }
}