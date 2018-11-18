import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { interval, observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-live-dot',
  templateUrl: './live-dot.component.html',
  styleUrls: ['./live-dot.component.scss']
})
export class LiveDotComponent implements OnInit {
  @ViewChild('dot') dotElement: ElementRef;
  @Input() bounds: any;
  @Input() pos: { left: string, top: string }
  @Input() size: { width: string, height: string };
  @Output() wallCollisionEvent = new EventEmitter();

  private elStyles;

  constructor() { }

  ngOnInit() {
    this.elStyles = this.dotElement.nativeElement.style;
    this.setSize(this.size);
    this.setStartPos(this.pos);
    this.travel();
  }
  getDotPostition() {
    return {
      top: parseInt(this.elStyles.top),
      left: parseInt(this.elStyles.left),
      type: '%'
    }
  }
  setSize(size){
    this.elStyles.width = size.width;
    this.elStyles.height = size.height;
  }
  setStartPos(pos) {
    if(pos){
      console.log(pos, this.size);
      this.elStyles.backgroundColor = '#f00';
      this.elStyles.top = (pos.top === 0 ? pos.top + 3 : pos.top - 3) + '%';
      this.elStyles.left = (pos.left=== 0 ? pos.left + 3 : pos.left - 3) + "%";
    } else{
      this.elStyles.backgroundColor = '#5789D8';
      this.elStyles.top = this.rand(0, 100) + '%';
      this.elStyles.left = this.rand(0, 100) + '%';
    }
  }

  travel() {
    const animStream = interval(100);
    
    const subscription = animStream.subscribe(n => {
      const actualPos = this.getDotPostition();

      if(this.detectWallCollision()){
        //subscription.unsubscribe();
        this.onWallCollision(actualPos);
        return;
      }
      this.dotElement.nativeElement.style.top = (actualPos.top + this.rand(-1, 1)) + actualPos.type;
      this.dotElement.nativeElement.style.left = (actualPos.left + this.rand(-1, 1)) + actualPos.type;
    });

  }

  detectWallCollision(){
    const actualPos = this.getDotPostition();
    const leftWallHit = (actualPos.left <= 0) ? true: false;
    const topWallHit = (actualPos.top <= 0) ? true:false;
    const rightWallHit = (actualPos.left >= (100 - parseInt(this.size.width))) ? true: false;
    const bottomWallHit = (actualPos.top >= (100 - parseInt(this.size.height))) ? true: false;

    return leftWallHit || topWallHit || rightWallHit || bottomWallHit;
  }

  onWallCollision(pos){
    this.wallCollisionEvent.emit(pos);
    this.elStyles.top = (pos.top === 0 ? pos.top + 3 : pos.top - 3) + '%';
    this.elStyles.left = (pos.left=== 0 ? pos.left + 3 : pos.left - 3) + "%";
    this.elStyles.width = (parseInt(this.elStyles.width) + 1) + "%";
    this.elStyles.height = (parseInt(this.elStyles.height) + 1) + "%";
    
  }

  reproduce() { }

  // prepare move methods for random styles of movement ()

  //helpers

  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
}
