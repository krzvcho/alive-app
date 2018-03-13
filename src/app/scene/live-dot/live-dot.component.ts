import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

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
    const interval = IntervalObservable
      .create(10)
      .subscribe((i) => {
        this.dotElement.nativeElement.style.top = i + '%';
        if (i === 100) {
          interval.unsubscribe();
        }
      });
  }
  onHitWall() { }
  reproduce() { }

}
