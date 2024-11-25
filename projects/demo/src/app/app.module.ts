import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabGroupGestureModule } from 'mat-tab-group-gesture';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabNavGestureModule } from 'mat-tab-nav-gesture';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatTabGroupGestureModule,
    MatTabNavGestureModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
