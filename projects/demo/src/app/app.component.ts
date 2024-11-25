import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabGroupGestureModule } from 'mat-tab-group-gesture';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  swipeLimitWidth = 80;
  connectEdges = true;
  public links = [];

  constructor() {
    for (let index = 1; index < 21; index++) {
      this.links.push(`Nav Link ${index}`);
    }
  }
}
