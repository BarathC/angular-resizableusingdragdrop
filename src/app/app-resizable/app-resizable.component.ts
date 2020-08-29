import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import {ResizableLayoutEnum} from '../enums/app-enum'

@Component({
  selector: 'app-app-resizable',
  templateUrl: './app-resizable.component.html',
  styleUrls: ['./app-resizable.component.css']
})
export class AppResizableComponent implements OnInit {

    @Input()
    public eLayout: ResizableLayoutEnum;

    public sLayoutClass: string;

    public sSplitterType: string;

    public sAxis: string;

    public sGridColumnTemplate: string;

    public sGridRowTemplate: string;

    //Transformed position
    private nTransformedPosition: number;
    //Minimum transform allowed
    private nMinTransformAllowed: number;
    //Maximum transform allowed
    private nMaxTransformAllowed: number;

    private oSplitterPosition: any = {
      nInitialPosition: 200,
      nMaxPosition: 400,
      nMinPosition: 100
    }

    public ngOnInit(): void {
      this.fnInitialiseVariables();
      this.nTransformedPosition = this.oSplitterPosition.nInitialPosition;
      this.fnSetMinAndMaxTranformationAllowed();
      this.fnSetGridPosition();
      this.fnSetLayout()
    }

    public ngOnChanges(simpleChanges: SimpleChanges): void {
      if(!!simpleChanges && simpleChanges.eLayout.isFirstChange() === false){
        this.fnInitialiseVariables();
      this.nTransformedPosition = this.oSplitterPosition.nInitialPosition;
      this.fnSetMinAndMaxTranformationAllowed();
      this.fnSetGridPosition();
      this.fnSetLayout()
      }

    }


    public efnOnDrop(event: any): void {
        //Get active transform
        let nActiveTransform: number = 0;
        if (this.eLayout === ResizableLayoutEnum.Right || this.eLayout === ResizableLayoutEnum.Left)
            nActiveTransform = event.source._dragRef._activeTransform.x;
        else
            nActiveTransform = event.source._dragRef._activeTransform.y;

        if (this.eLayout === ResizableLayoutEnum.Right || this.eLayout === ResizableLayoutEnum.Bottom) {
            this.nTransformedPosition = (this.oSplitterPosition.nInitialPosition + nActiveTransform);
            if (nActiveTransform < this.nMinTransformAllowed) {
                this.fnSetSplitterPosition(event, this.nMinTransformAllowed, this.oSplitterPosition.nMinPosition)
            }
            if (nActiveTransform > this.nMaxTransformAllowed) {
                this.fnSetSplitterPosition(event, this.nMaxTransformAllowed, this.oSplitterPosition.nMaxPosition)
            }
        }
        else {
            this.nTransformedPosition = (this.oSplitterPosition.nInitialPosition - nActiveTransform);
            if (nActiveTransform < this.nMinTransformAllowed) {
                this.fnSetSplitterPosition(event, this.nMinTransformAllowed, this.oSplitterPosition.nMaxPosition)
            }
            if (nActiveTransform > this.nMaxTransformAllowed) {
                this.fnSetSplitterPosition(event, this.nMaxTransformAllowed, this.oSplitterPosition.nMinPosition)
            }
        }
        this.fnSetGridPosition();
    }

    //Method to set minimum and maximum transform allowed
    private fnSetMinAndMaxTranformationAllowed(): void {
        if (this.eLayout === ResizableLayoutEnum.Right || this.eLayout === ResizableLayoutEnum.Bottom) {
            this.nMinTransformAllowed = this.oSplitterPosition.nMinPosition - this.nTransformedPosition;
            this.nMaxTransformAllowed = this.oSplitterPosition.nMaxPosition - this.nTransformedPosition;
        }
        else {
            this.nMaxTransformAllowed = this.nTransformedPosition - this.oSplitterPosition.nMinPosition;
            this.nMinTransformAllowed = this.nTransformedPosition - this.oSplitterPosition.nMaxPosition;
        }
    }

    //Set grid template
    private fnSetGridPosition(): void {
        switch (this.eLayout) {
            case ResizableLayoutEnum.Left:
                this.sGridColumnTemplate = '4px ' + this.nTransformedPosition + 'px';
                break;
            case ResizableLayoutEnum.Right:
                this.sGridColumnTemplate = this.nTransformedPosition + 'px ' + '4px';
                break;
            case ResizableLayoutEnum.Top:
                this.sGridRowTemplate = '4px ' + this.nTransformedPosition + 'px';
                break;
            case ResizableLayoutEnum.Bottom:
                this.sGridRowTemplate = this.nTransformedPosition + 'px ' + '4px';
                break;
        }
    }

    //Method to ste splitter layout, axis and type
    private fnSetLayout(): void {
        switch (this.eLayout) {
            case ResizableLayoutEnum.Left:
                this.sLayoutClass = 'dockLeft';
                this.sSplitterType = 'im-tm-tl-verticalsplitter';
                this.sAxis = 'x';
                break;
            case ResizableLayoutEnum.Right:
                this.sLayoutClass = 'dockRight';
                this.sSplitterType = 'im-tm-tl-verticalsplitter';
                this.sAxis = 'x';
                break;
            case ResizableLayoutEnum.Top:
                this.sLayoutClass = 'dockTop';
                this.sSplitterType = 'im-tm-tl-horizontalsplitter';
                this.sAxis = 'y';
                break;
            case ResizableLayoutEnum.Bottom:
                this.sLayoutClass = 'dockBottom';
                this.sSplitterType = 'im-tm-tl-horizontalsplitter';
                this.sAxis = 'y';
                break;
            default:
                this.sLayoutClass = '';
                this.sSplitterType = '';
        }
    }

    //Set splitter poistion
    private fnSetSplitterPosition(event:any, nTransformAllowed:number, nCurrentPosition:number): void {
        this.nTransformedPosition = nCurrentPosition;
        if (this.eLayout === ResizableLayoutEnum.Right || this.eLayout === ResizableLayoutEnum.Left)
            event.source._dragRef._activeTransform.x = nTransformAllowed;
        else
            event.source._dragRef._activeTransform.y = nTransformAllowed;
    }

    private fnInitialiseVariables(): void {
      this.sAxis = '';
      this.sLayoutClass = '';
      this.sGridColumnTemplate = '';
      this.sGridRowTemplate = '';
      this.sSplitterType = '';
      this.nMaxTransformAllowed = 0;
      this.nTransformedPosition = 0;
      this.nMinTransformAllowed = 0

    }

}