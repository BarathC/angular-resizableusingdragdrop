import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { AppResizableComponent } from './app-resizable/app-resizable.component'

@NgModule({
  imports:      [ BrowserModule, FormsModule, DragDropModule, MatCardModule, MatToolbarModule],
  declarations: [ AppComponent, AppResizableComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
