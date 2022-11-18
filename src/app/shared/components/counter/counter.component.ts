import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() allowZero: boolean = false;
  @Input() counter: number = 1;
  @Output() plusEmiter = new EventEmitter();
  @Output() minusEmiter = new EventEmitter();
  @Output() removeEmiter = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  plus() {
    this.counter++;
    this.plusEmiter.emit(this.counter);
  }

  minus() {
    this.counter--;
    if (this.counter < 1) {
      this.counter = 1;
      if (this.allowZero) {
        this.removeEmiter.emit(true);
      }
    }
    this.minusEmiter.emit(this.counter);
  }

}
