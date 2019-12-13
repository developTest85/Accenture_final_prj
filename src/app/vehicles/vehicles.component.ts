import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class VehiclesComponent implements OnInit, OnDestroy {

  index: number = null;
  editeMode = false;

  visible:boolean = false;
  detail: boolean = false;
  priceChanged: number;
  
  model: string;
  code: string;
  year: number;
  imageUrl: string;
  amount: number;
  date: Date;

  vehicles: Vehicle[] = [];
  vehicleModel: string;

  subscription = new Subscription

  edit: boolean = false;

  constructor(private vehicleService: VehicleService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {


    this.vehicles = this.vehicleService.getVehicles();
    this.subscription = this.vehicleService.edit.subscribe(edit => {
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
    this.index = null;
    this.vehicleService.index.next(this.index);
    console.log(this.index);

    this.vehicleService.editMode.next(false);
  }


  onUpdateVehicle(index: number) {

    if (this.index !== index) {
      console.log("INTO IF");
      this.index = index;
      this.vehicleService.editMode.next(true);
      this.vehicleService.index.next(index);

      this.edit = true;
    } else {
      console.log("OUT IF");
    }
    

  }
  
  onDeleteVehicle(index: number){
    this.vehicleService.deleteVehicle(index);
  }

  addVehicle(vehicle: Vehicle) {
    this.vehicleService.addVehicle(vehicle);
  }

  onUpdateMessage(){
    this.visible = null;
  }

  onShowChange(price: number){
    this.priceChanged = price;
    this.visible = true;
  }

  onChangeView(visible: boolean){
    this.visible = visible;
  }

  setChangedVehicle(model: string){
    this.vehicleModel = model;
  }

  notChanged(visible:boolean){
    this.visible = visible;
  }

  onOpenDetail(index: number){
    this.index = index;
    this.detail = true;
  }

  closeDetail(visible: boolean){
    this.detail = visible;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
