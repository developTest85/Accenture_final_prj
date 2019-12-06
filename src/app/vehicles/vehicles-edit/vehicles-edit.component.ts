import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Vehicle } from 'src/app/shared/vehicle.model';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, MaxLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/vehicle.service';

@Component({
  selector: 'app-vehicles-edit',
  templateUrl: './vehicles-edit.component.html',
  styleUrls: ['./vehicles-edit.component.css']
})
export class VehiclesEditComponent implements OnInit, OnChanges {

  vehicleForm: FormGroup;
  editMode: boolean = false;
  vehicle: Vehicle;

  @Input() index: number = null;
  @Output() vehicleEm = new EventEmitter<Vehicle>();


  constructor(private vehicleService: VehicleService, private router: Router) { }

  ngOnChanges() {
    this.vehicleService.editMode.subscribe(editMode => {
      this.editMode = editMode;
      if (this.editMode === false) {
        this.vehicleForm.reset();
      }
    })
    this.vehicleService.index.subscribe(index => {
      this.index = index;
    })

    this.initForm();
  }

  ngOnInit() {

    if (this.index === null) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }


    this.initForm();
  }

  onSubmit() {

    if (this.editMode === false) {
      this.emit(this.vehicleForm.value);
      console.log(this.vehicleForm);
      this.vehicleForm.reset();

    }
    else {
      this.vehicleService.updateVehicle(this.index, this.vehicleForm.value);
      this.editMode = false;
      this.vehicleForm.reset();
    }

  }

  emit(vehicle: Vehicle) {
    this.vehicleEm.emit(vehicle);
  }

  closeEdit() {
    this.vehicleService.edit.next(false);
  }

  resetEdit(form: NgForm) {
    form.reset();
  }

  private initForm() {
    let model = '';
    let code = '';
    let year = null;
    let amount = null;
    let imageUrl = '';

    if (this.editMode === true) {
      const vehicle = this.vehicleService.getVehicle(this.index);
      model = vehicle.model;
      code = vehicle.code;
      amount = vehicle.amount;
      year = vehicle.year;
      imageUrl = vehicle.imageUrl;

    }

    this.vehicleForm = new FormGroup({
      model: new FormControl(model, [Validators.required, Validators.maxLength(20)]),
      code: new FormControl(code, [Validators.required, Validators.minLength(5), Validators.maxLength(8), this.forbiddenVehicles.bind(this)]),
      year: new FormControl(year, [Validators.required, Validators.minLength(4)]),
      amount: new FormControl(amount),
      imageUrl: new FormControl(imageUrl),
    });
  }

  forbiddenVehicles(control: FormControl): { [s: string]: boolean } {
    let vehiclesFiltered = this.vehicleService.getVehicles();

    /*let code = [];

    vehiclesFiltered.forEach(vehicle=>{
      code.push(vehicle.code)
    });
    if (code.indexOf(control.value) !== -1 && this.editMode === false) {
      return {'vehicleIsForbidden': true};
    }
    return null;*/

    if (this.editMode === false) {
      let codes = [];

      vehiclesFiltered.forEach(vehicle => {
        codes.push(vehicle.code)
      });
      if (codes.indexOf(control.value) !== -1) {
        console.log("TRUEEEEEEE");
        return { 'vehicleIsForbidden': true };
      }
      console.log("FALSEEEEEEEEEEEEEE");
      return null;

    } else {


      let code = vehiclesFiltered[this.index].code;
      let codes = [];

      vehiclesFiltered.forEach(vehicle => {
        if (vehicle.code !== code){
          codes.push(vehicle.code)
        };
      });
      
      if (codes.indexOf(control.value) !== -1) {
        console.log("TRUEEEEEEE");
        return { 'vehicleIsForbidden': true };
      }
      console.log("FALSEEEEEEEEEEEEEE");
      return null;
    }

  }

}
