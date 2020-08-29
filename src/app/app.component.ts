import { Component } from '@angular/core';
import {ResizableLayoutEnum} from './enums/app-enum'
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  public eLayout: ResizableLayoutEnum = ResizableLayoutEnum.Right;

}
