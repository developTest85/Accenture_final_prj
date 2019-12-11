import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Vehicle } from './vehicle.model';
import { VehicleService } from '../vehicle.service';

@Injectable({providedIn: 'root'})
export class VehiclesResolverService implements Resolve<Vehicle[]> {

    constructor(private vehicleService: VehicleService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const vehicles = this.vehicleService.getVehicles();

        return vehicles;
    }

}