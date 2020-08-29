import { Component } from '@angular/core';
import {ResizableLayoutEnum} from './enums/app-enum';

export type SelectOption = {id: ResizableLayoutEnum, value:string, enable: boolean};

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  public eLayout: ResizableLayoutEnum = ResizableLayoutEnum.Right;

  public selectOptions: SelectOption[] = [
    {id: ResizableLayoutEnum.Left, value: 'Left', enable: true},
    {id:ResizableLayoutEnum.Right, value: 'Right', enable: true},
    {id: ResizableLayoutEnum.Top, value: 'Top', enable: true},
    {id: ResizableLayoutEnum.Bottom, value: 'Bottom', enable: false}
  ];

  public efnSelectedThread( oSelectedOption: SelectOption) {
    this.eLayout = oSelectedOption.id;
  }

}
