import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveDotComponent } from './live-dot.component';

describe('LiveDotComponent', () => {
  let component: LiveDotComponent;
  let fixture: ComponentFixture<LiveDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveDotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
