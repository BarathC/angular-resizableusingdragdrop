import { Component } from '@angular/core';
import {ResizableLayoutEnum} from './enums/app-enum';

export type SelectOption = {id: ResizableLayoutEnum, value:string};

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  public eLayout: ResizableLayoutEnum = ResizableLayoutEnum.Right;

  public selectOptions: SelectOption[] = [
    {id: ResizableLayoutEnum.Left, value: 'Left'},
    {id:ResizableLayoutEnum.Right, value: 'Right'},
    {id: ResizableLayoutEnum.Top, value: 'Top'},
    {id: ResizableLayoutEnum.Bottom, value: 'Bottom'}
  ];

  public efnSelectedThread( oSelectedOption: SelectOption) {
    this.eLayout = oSelectedOption.id;
  }

}
