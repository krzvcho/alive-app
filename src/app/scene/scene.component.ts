import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener,
  ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { LiveDotComponent } from './live-dot/live-dot.component';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit, AfterViewInit {
  @ViewChild('scene') sceneElement: ElementRef;
  @ViewChild('sceneContainer', { read: ViewContainerRef }) container: ViewContainerRef;

  public sceneBorderPos: Object;

  @HostListener('window:resize') onResize() {
    if (this.sceneElement) {
      this.sceneBorderPos = this.getBorderPositions();
      console.log(this.sceneBorderPos);
    }
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.sceneBorderPos = this.getBorderPositions();
    }

  createCmp() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LiveDotComponent);
    const cmp = this.container.createComponent(componentFactory);

    cmp.instance.bounds = this.sceneBorderPos;
  }
  addDot() {
    this.createCmp();
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
