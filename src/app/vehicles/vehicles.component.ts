import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../shared/vehicle.model';
import { VehicleService } from '../vehicle.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  index: number = null;
  editeMode = false;
  
  model: string;
  code: string;
  year: number;
  imageUrl: string;
  amount: number;
  date: Date;

  vehicles: Vehicle[] = [];

  subscription = new Subscription

  edit: boolean = false;

  constructor(private vehicleService: VehicleService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {


    this.vehicles = this.vehicleService.getVehicles();
    this.vehicleService.edit.subscribe(edit => {
      this.edit = edit;
    });
  }

  open(content, vehicle: Vehicle) {
    this.model = vehicle.model;
    this.code = vehicle.code;
    this.year = vehicle.year;
    this.imageUrl = vehicle.imageUrl;
    this.amount = vehicle.amount;
    this.date = vehicle.date;

    this.modalService.open(content).result.then((result) => {
      this.model = vehicle.model;
    }, (reason) => {
      console.log(reason);
    });
  }

  onNewVehicle(){
    this.edit = true;
    this.vehicleService.editMode.next(false);
  }


  onUpdateVehicle(index: number) {

    if (index !== null) {
      this.index = index;
      this.vehicleService.editMode.next(true);
      this.vehicleService.index.next(index);

      this.edit = true;
    } 

  }
  
  onDeleteVehicle(index: number){
    this.vehicleService.deleteVehicle(index);
  }

  addVehicle(vehicle: Vehicle) {
    this.vehicleService.addVehicle(vehicle);
  }

}
