import { Component, Input, OnInit } from '@angular/core';
import { MediaElement } from '../../interfaces/media-element.interface';

@Component({
  selector: 'radio-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit{
  // Custom Properties
  @Input() height:number = 500;
  @Input() fullScreen:boolean = false;
  @Input() mediaElement:MediaElement[] = [];
  @Input() intervalTime:number = 0;

  // Final Properties
  public currentPosition:number = 0;
  private intervalAutoSlide = setInterval(() => {}, 0);
  public isHidden = false;

  constructor(){

  }

  ngOnInit(): void {
    this.startAutoSlide();
  }

  public startAutoSlide():void{
    console.log(this.mediaElement.length);
    // if (this.mediaElement.length > 0){

    //   this.intervalAutoSlide = setInterval(() => {


    //     this.nextImage();

    //   }, this.intervalTime);

    // }
  }


  public nextImage():void{

      // if (this.currentPosition == this.mediaElement.length){
      //   this.currentPosition = 0;
      // } else {
      //   this.currentPosition++;
      // }
      console.log("sadsadsad");
      this.currentPosition = (this.currentPosition + 1) % this.mediaElement.length;
      console.log(this.currentPosition);
      // clearInterval(this.intervalAutoSlide);

  }

  public prevImage():void{
    if (this.mediaElement.length > 0){
      // if (this.currentPosition == 0){
      //   this.currentPosition = this.mediaElement.length;
      // } else {
      //   this.currentPosition--;
      // }
      this.currentPosition = (this.currentPosition - 1 + this.mediaElement.length) % this.mediaElement.length;
      // clearInterval(this.intervalAutoSlide);
    }
  }

  public goImage(index:number):void{
    if (this.mediaElement.length > 0){
      this.currentPosition = index;

      // clearInterval(this.intervalAutoSlide);
    }
  }



  get currentTransform():string {
    return `translateX(-${this.currentPosition * 100}%)`;
  }

  ngOnDestroy(){
    clearInterval(this.intervalAutoSlide);
  }

}
