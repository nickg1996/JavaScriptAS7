import { Directive ,Input,ElementRef,OnInit,HostListener } from '@angular/core';
@Directive({
  selector: '[appAttributeDirective]'
})
export class AttributeDirectiveDirective {
@Input('elementMe') elmentName: string;
  constructor(private elm: ElementRef) { }
  @HostListener('mouseenter',['$event.target']) mouseover(){

    this.addMyUnderLine(this.elmentName);
}
@HostListener('mouseleave') mouseleave(){
      if (this.elmentName === "underline"){
      this.elm.nativeElement.style.textDecoration = "none";}
      else{ this.elm.nativeElement.style.fontWeight = "normal"; }
}
  addMyUnderLine(elementNme):void{
      if(elementNme === "underline" )
      this.elm.nativeElement.style.textDecoration = "underline" ;
      else{this.elm.nativeElement.style.fontWeight= "bold";}

  }
ngOnInit(): void {
    // console.log("coloring: ", this.highlightColour);
    // this.elm.nativeElement.style.backgroundColor = this.highlightColour || "green";
}
}
