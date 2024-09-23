import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'radio-element-radio',
  templateUrl: './element-radio.component.html',
  styleUrl: './element-radio.component.css'
})
export class ElementRadioComponent implements OnInit{

  isPlaying: boolean = false;

  ngOnInit(): void {

  }

  public togglePlay() {
    if (this.isPlaying) {
      // this.audio.pause();

    } else {
      // this.audio.play();

    }
    this.isPlaying = !this.isPlaying;
  }

}
