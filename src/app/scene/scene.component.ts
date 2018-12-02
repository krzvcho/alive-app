import {
  Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener,
  ViewContainerRef, ComponentFactoryResolver
} from '@angular/core';

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
  public cmpList = [];

  @HostListener('window:resize') onResize() {
    if (this.sceneElement) {
      this.sceneBorderPos = this.getBorderPositions();
    }
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.sceneBorderPos = this.getBorderPositions();
  }

  createCmp(pos?) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LiveDotComponent);
    const cmp = this.container.createComponent(componentFactory);
    this.cmpList.push(cmp);  
    cmp.instance.pos = pos; 
    cmp.instance.bounds = this.sceneBorderPos;
    cmp.instance.size = { width: '1%', height: '1%' };
    cmp.instance.wallCollisionEvent.subscribe(pos => {
      //this.addDot(pos);
      //cmp.destroy();
      //console.log(this.cmpList);
    });

  }
  addDot(pos?) {
    this.createCmp(pos);
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
