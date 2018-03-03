import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit, AfterViewInit {
  @ViewChild('scene') sceneElement: ElementRef;
  public sceneBorderPos: Object;

  @HostListener('window:resize') onResize() {
    if (this.sceneElement) {
      this.sceneBorderPos = this.getBorderPositions();
      console.log(this.sceneBorderPos);
    }
  }
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.sceneBorderPos = this.getBorderPositions();
  }

  getBorderPositions(): Object {
    return {
      top: 0,
      left: 0,
      bottom: this.sceneElement.nativeElement.offsetHeight,
      right: this.sceneElement.nativeElement.offsetWidth
    };
  }
}
