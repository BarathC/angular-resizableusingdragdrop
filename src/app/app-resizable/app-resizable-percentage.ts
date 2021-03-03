// import {
//   Component,
//   OnInit,
//   Input,
//   ChangeDetectionStrategy,
//   SimpleChanges,
//   ViewChild,
//   ElementRef,
//   HostListener
// } from "@angular/core";
// import { ResizableLayoutEnum } from "../enums/app-enum";

// @Component({
//   selector: "app-app-resizable",
//   templateUrl: "./app-resizable.component.html",
//   styleUrls: ["./app-resizable.component.css"]
// })
// export class AppResizableComponent implements OnInit {
//   @Input()
//   public eLayout: ResizableLayoutEnum;

//   public sLayoutClass: string;

//   public sSplitterType: string;

//   public sAxis: string;

//   public sGridColumnTemplate: string;

//   public sGridRowTemplate: string;

//   //Transformed position
//   private nTransformedPosition: number;
//   //Minimum transform allowed
//   private nMinTransformAllowed: number;
//   //Maximum transform allowed
//   private nMaxTransformAllowed: number;

//   private oSplitterPosition: any = {
//     nInitialPosition: 50,
//     nMaxPosition: 50,
//     nMinPosition: 30
//   };

//   //Resize timeout
//   private oResizeTimeout: any;
//   //Splitter position
//   private oInitialSplitterPosition: any;
//   //Resizable Element
//   @ViewChild("resizable") oResizableElement: ElementRef;
//   private nPreviousPercentage: number;
//   private nDetailAreaWidth: number = 0;

//   public ngOnInit(): void {
//     this.fnInitialiseVariables();
//     this.oInitialSplitterPosition = Object.create(this.oSplitterPosition);
//     // this.nTransformedPosition = this.oSplitterPosition.nInitialPosition;
//     // this.fnSetMinAndMaxTranformationAllowed();
//     // this.fnSetGridPosition();
//     this.fnSetGridPositionInitial();
//     this.fnSetLayout();
//   }

//   public ngOnChanges(simpleChanges: SimpleChanges): void {
//     if (!!simpleChanges && simpleChanges.eLayout.isFirstChange() === false) {
//       this.oInitialSplitterPosition = Object.create(this.oSplitterPosition);
//       this.fnSetGridPositionInitial();
//       this.fnSetLayout();
//       this.nTransformedPosition = null;
//       setTimeout(()=>{
//  this.fnRenderAgain();
//       },100);
     
//     }
//   }

//   /**
//    * AfterViewInit life cycle implemented
//    *
//    * @memberof ImTmTlResizableComponent
//    */
//   public ngAfterViewInit(): void {
//     this.fnRenderAgain();
//   }

//   //Render the component
//   private fnRenderAgain(): void {
//     if (this.oResizableElement === null || this.oResizableElement === undefined)
//       return;
//     //Get Width of detail area
//     this.nDetailAreaWidth = this.fnGetDetailAreaWidth();
//     if (!!this.nDetailAreaWidth && this.nDetailAreaWidth > 0) {
//       if (!!this.nTransformedPosition)
//         this.nTransformedPosition =
//           this.nPreviousPercentage * this.nDetailAreaWidth;
//       else {
//         this.nTransformedPosition =
//           (this.oSplitterPosition.nInitialPosition / 100) *
//           this.nDetailAreaWidth;
//         this.nPreviousPercentage =
//           this.oSplitterPosition.nInitialPosition / 100;
//       }
//       this.fnTransformPositionValueToPixel2();
//       this.fnSetMinAndMaxTranformationAllowed();
//       this.fnSetGridPosition();
//     }
//   }

//   //Transform percent to pixel
//   private fnTransformPositionValueToPixel2(): void {
//     this.oInitialSplitterPosition.nMinPosition =
//       (this.oSplitterPosition.nMinPosition / 100) * this.nDetailAreaWidth;
//     this.oInitialSplitterPosition.nMaxPosition =
//       (this.oSplitterPosition.nMaxPosition / 100) * this.nDetailAreaWidth;
//     this.oInitialSplitterPosition.nInitialPosition =
//       (this.oSplitterPosition.nInitialPosition / 100) * this.nDetailAreaWidth;
//   }

//   /**
//    * Handle Window resize event
//    *
//    * @returns {void}
//    * @memberof ImTmTlResizableComponent
//    */
//   @HostListener("window:resize", ["$event"])
//   public onWindowResize(oEvent: any): void {
//     //debounce resize, wait for resize to finish before doing stuff
//     if (this.oResizeTimeout) {
//       clearTimeout(this.oResizeTimeout);
//     }
//     this.oResizeTimeout = setTimeout(
//       (() => {
//         this.fnRenderAgain();
//       }).bind(this),
//       10
//     );
//   }

//   public efnOnDrop(event: any): void {
//     //Get active transform
//     let nActiveTransform: number = 0;
//     if (
//       this.eLayout === ResizableLayoutEnum.Right ||
//       this.eLayout === ResizableLayoutEnum.Left
//     )
//       nActiveTransform = event.source._dragRef._activeTransform.x;
//     else nActiveTransform = event.source._dragRef._activeTransform.y;

//     if (
//       this.eLayout === ResizableLayoutEnum.Right ||
//       this.eLayout === ResizableLayoutEnum.Bottom
//     ) {
//       this.nTransformedPosition =
//         this.oInitialSplitterPosition.nInitialPosition + nActiveTransform;
//       if (nActiveTransform < this.nMinTransformAllowed) {
//         this.fnSetSplitterPosition(
//           event,
//           this.nMinTransformAllowed,
//           this.oInitialSplitterPosition.nMinPosition
//         );
//       }
//       if (nActiveTransform > this.nMaxTransformAllowed) {
//         this.fnSetSplitterPosition(
//           event,
//           this.nMaxTransformAllowed,
//           this.oInitialSplitterPosition.nMaxPosition
//         );
//       }
//     } else {
//       this.nTransformedPosition =
//         this.oInitialSplitterPosition.nInitialPosition - nActiveTransform;
//       if (nActiveTransform < this.nMinTransformAllowed) {
//         this.fnSetSplitterPosition(
//           event,
//           this.nMinTransformAllowed,
//           this.oInitialSplitterPosition.nMaxPosition
//         );
//       }
//       if (nActiveTransform > this.nMaxTransformAllowed) {
//         this.fnSetSplitterPosition(
//           event,
//           this.nMaxTransformAllowed,
//           this.oInitialSplitterPosition.nMinPosition
//         );
//       }
//     }
//     this.nPreviousPercentage =
//       this.nTransformedPosition / this.nDetailAreaWidth;
//     this.fnSetGridPosition();
//   }

//   //Method to set minimum and maximum transform allowed
//     //Method to set minimum and maximum transform allowed
//     private fnSetMinAndMaxTranformationAllowed(): void {
//         if (this.eLayout === ResizableLayoutEnum.Right || this.eLayout === ResizableLayoutEnum.Bottom) {
//             this.nMinTransformAllowed = this.oInitialSplitterPosition.nMinPosition - this.oInitialSplitterPosition.nInitialPosition;
//             this.nMaxTransformAllowed = this.oInitialSplitterPosition.nMaxPosition - this.oInitialSplitterPosition.nInitialPosition;
//         }
//         else {
//             this.nMaxTransformAllowed = this.oInitialSplitterPosition.nInitialPosition - this.oInitialSplitterPosition.nMinPosition;
//             this.nMinTransformAllowed = this.oInitialSplitterPosition.nInitialPosition - this.oInitialSplitterPosition.nMaxPosition;
//         }
//     }

//   //Set grid template
//   private fnSetGridPosition(): void {
//     switch (this.eLayout) {
//       case ResizableLayoutEnum.Left:
//         this.sGridColumnTemplate = "4px " + this.nTransformedPosition + "px";
//         break;
//       case ResizableLayoutEnum.Right:
//         this.sGridColumnTemplate = this.nTransformedPosition + "px " + "4px";
//         break;
//       case ResizableLayoutEnum.Top:
//         this.sGridRowTemplate = "4px " + this.nTransformedPosition + "px";
//         break;
//       case ResizableLayoutEnum.Bottom:
//         this.sGridRowTemplate = this.nTransformedPosition + "px " + "4px";
//         break;
//     }
//   }

//       private fnSetGridPositionInitial(): void {
//         switch (this.eLayout) {
//             case ResizableLayoutEnum.Left:
//                 this.sGridColumnTemplate = '4px ' + ' min-content';
//                 break;
//             case ResizableLayoutEnum.Right:
//                 this.sGridColumnTemplate = 'min-content ' + '4px';
//                 break;
//             case ResizableLayoutEnum.Top:
//                 this.sGridRowTemplate = '4px ' + ' min-content';
//                 break;
//             case ResizableLayoutEnum.Bottom:
//                 this.sGridRowTemplate = 'min-content ' + '4px';
//                 break;
//         }
//     }

//   //Method to ste splitter layout, axis and type
//   private fnSetLayout(): void {
//     switch (this.eLayout) {
//       case ResizableLayoutEnum.Left:
//         this.sLayoutClass = "dockLeft";
//         this.sSplitterType = "verticalsplitter";
//         this.sAxis = "x";
//         break;
//       case ResizableLayoutEnum.Right:
//         this.sLayoutClass = "dockRight";
//         this.sSplitterType = "verticalsplitter";
//         this.sAxis = "x";
//         break;
//       case ResizableLayoutEnum.Top:
//         this.sLayoutClass = "dockTop";
//         this.sSplitterType = "horizontalsplitter";
//         this.sAxis = "y";
//         break;
//       case ResizableLayoutEnum.Bottom:
//         this.sLayoutClass = "dockBottom";
//         this.sSplitterType = "horizontalsplitter";
//         this.sAxis = "y";
//         break;
//       default:
//         this.sLayoutClass = "";
//         this.sSplitterType = "";
//     }
//   }

//   //Set splitter poistion
//   private fnSetSplitterPosition(
//     event: any,
//     nTransformAllowed: number,
//     nCurrentPosition: number
//   ): void {
//     this.nTransformedPosition = nCurrentPosition;
//     if (
//       this.eLayout === ResizableLayoutEnum.Right ||
//       this.eLayout === ResizableLayoutEnum.Left
//     )
//       event.source._dragRef._activeTransform.x = nTransformAllowed;
//     else event.source._dragRef._activeTransform.y = nTransformAllowed;
//   }

//   private fnInitialiseVariables(): void {
//     this.sAxis = "";
//     this.sLayoutClass = "";
//     this.sGridColumnTemplate = "";
//     this.sGridRowTemplate = "";
//     this.sSplitterType = "";
//     this.nMaxTransformAllowed = 0;
//     this.nTransformedPosition = 0;
//     this.nMinTransformAllowed = 0;
//     this.nDetailAreaWidth = 0;
//     this.nPreviousPercentage = 0;
//   }

//   private fnGetDetailAreaWidth(): number {
//     if (
//       this.eLayout === ResizableLayoutEnum.Right ||
//       this.eLayout === ResizableLayoutEnum.Left
//     )
//     return (this.oResizableElement.nativeElement as HTMLElement).parentElement
//       .parentElement.offsetWidth;
//       else
//         return (this.oResizableElement.nativeElement as HTMLElement).parentElement
//       .parentElement.offsetHeight;
//   }
// }
