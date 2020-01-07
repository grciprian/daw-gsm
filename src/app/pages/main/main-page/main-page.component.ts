import { Gadget } from './../../../server-connection/models/gadget';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  selectedGadget: Gadget;
  selectedGadgetBehaviourSubject: BehaviorSubject<Gadget>;

  constructor() { }

  ngOnInit() {
    this.selectedGadgetBehaviourSubject = new BehaviorSubject<Gadget>(this.selectedGadget);
  }

  receiveSelectedGadgetEvent($event) {
    this.selectedGadget = $event;
    this.selectedGadgetBehaviourSubject.next(this.selectedGadget);
  }

}
