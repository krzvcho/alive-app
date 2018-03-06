import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SceneComponent } from './scene/scene.component';
import { LiveDotComponent } from './scene/live-dot/live-dot.component';


@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    LiveDotComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LiveDotComponent
  ]
})
export class AppModule { }
