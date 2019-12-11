import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  
  @Input() priceChanged: number;
  @Input() vehicleModel: string;

  @Output() visible = new EventEmitter<boolean>();

  ngOnInit() {
  }

  onClose(){
    this.visible.emit(false);
  }

}
