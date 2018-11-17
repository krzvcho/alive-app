import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
//import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-live-dot',
  templateUrl: './live-dot.component.html',
  styleUrls: ['./live-dot.component.scss']
})
export class LiveDotComponent implements OnInit {
  @ViewChild('dot') dotElement: ElementRef;
  @Input() bounds: any;

  constructor() {}

  ngOnInit() {
    this.setRandomStartPos();
    this.travel();
  }
  setRandomStartPos() {
    const rand = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    this.dotElement.nativeElement.style.backgroundColor = '#5789D8';
    this.dotElement.nativeElement.style.top = rand(0, 100) + '%';
    this.dotElement.nativeElement.style.left = rand(0, 100) + '%';
  }
  travel() {
    console.log('starting traveling');
  }
  onHitWall() { }
  reproduce() { }
}
