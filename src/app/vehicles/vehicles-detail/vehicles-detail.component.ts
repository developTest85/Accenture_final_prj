import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Vehicle } from 'src/app/shared/vehicle.model';
import { VehicleService } from 'src/app/vehicle.service';

@Component({
  selector: 'app-vehicles-detail',
  templateUrl: './vehicles-detail.component.html',
  styleUrls: ['./vehicles-detail.component.css']
})
export class VehiclesDetailComponent implements OnChanges, OnInit {

  @Input() index: number;
  vehicle: Vehicle;

  @Output() detail =  new EventEmitter<boolean>()

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private vehicleService: VehicleService) { }

  ngOnChanges(){
    this.vehicle = this.vehicleService.getVehicle(this.index);
  }

  ngOnInit() {
    this.vehicle = this.vehicleService.getVehicle(this.index);
  }

  onClose(){
    this.detail.emit(false);
  }

}
