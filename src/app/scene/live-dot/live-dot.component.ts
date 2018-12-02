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
      right: parseInt(this.elStyles.left) + parseInt(this.elStyles.width),
      bottom: parseInt(this.elStyles.top) + parseInt(this.elStyles.height),
      width: parseInt(this.elStyles.width),
      height: parseInt(this.elStyles.height),
      type: '%'
    }
  }
  setSize(size){
    this.elStyles.width = size.width;
    this.elStyles.height = size.height;
  }
  setStartPos(pos) {
    if(pos){
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
      if(this.detectWallCollision()){
        this.onWallCollision();
        return;
      }
      this.dotElement.nativeElement.style.top = (this.getDotPostition().top + this.rand(-1, 1)) + this.getDotPostition().type;
      this.dotElement.nativeElement.style.left = (this.getDotPostition().left + this.rand(-1, 1)) + this.getDotPostition().type;
    });

  }

  detectWallCollision(){
    const actualPos = this.getDotPostition();
    const leftWallHit = (actualPos.left <= 0) ? true: false;
    const topWallHit = (actualPos.top <= 0) ? true: false;
    const rightWallHit = (actualPos.right >= 100) ? true: false;
    const bottomWallHit = (actualPos.bottom >= 100) ? true: false;

    return leftWallHit || topWallHit || rightWallHit || bottomWallHit;
  }

  onWallCollision(){
    //this.wallCollisionEvent.emit(pos);
    this.elStyles.top = '50%';
    this.elStyles.left = '50%';
    this.elStyles.width = (parseInt(this.elStyles.width) + 1) + "%";
    this.elStyles.height = (parseInt(this.elStyles.height) + 1) + "%";
    
    const mutations: Array<string> = ['grow', 'colorize', 'shrink', 'radius']

    switch (this.randomArrayItem(mutations)) {
      case 'grow':
        this.elStyles.width = this.elStyles.width <= 6 ? (parseInt(this.elStyles.width) + 1) + "%": this.elStyles.width;
        this.elStyles.height = this.elStyles.height <= 6 ? (parseInt(this.elStyles.height) + 1) + "%": this.elStyles.height;
        break;
      case 'shrink':
        this.elStyles.width = this.elStyles.width>1 ? (parseInt(this.elStyles.width) - 1) + "%" : this.elStyles.width;
        this.elStyles.height = this.elStyles.height>1 ? (parseInt(this.elStyles.height) - 1) + "%" : this.elStyles.height;
        break
      case 'colorize':
        this.elStyles.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        break;
      case 'radius':
        this.elStyles.borderRadius = this.rand(0, 40)+'px';
        break;
    }
  }

  reproduce() { }

  // prepare move methods for random styles of movement ()

  //helpers

  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  randomArrayItem(items){
    return items[Math.floor(Math.random()*items.length)]; 
  }
}
