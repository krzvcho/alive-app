import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-live-dot',
  templateUrl: './live-dot.component.html',
  styleUrls: ['./live-dot.component.scss']
})
export class LiveDotComponent implements OnInit {
  @ViewChild('dot') dotElement: ElementRef;
  constructor() {}

  ngOnInit() {
    this.setRandomStartPos();
  }
  setRandomStartPos() {
    const rand = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    this.dotElement.nativeElement.style.backgroundColor = '#5789D8';
    this.dotElement.nativeElement.style.top = rand(0, 100) + 'px';
    this.dotElement.nativeElement.style.left = rand(0, 100) + 'px';
  }
  travel() { }
  onHitWall() { }
  reproduce() { }

}
