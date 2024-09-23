import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MediaElement } from '../../interfaces/media-element.interface';

@Component({
  selector: 'radio-message-board',
  templateUrl: './message-board.component.html',
  styleUrl: './message-board.component.css',
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MessageBoardComponent {

  public messageMediaElement:MediaElement[] = [
    {id: '01', title: 'Tu voz, tu fuerza 1', imgSrc: 'https://st3.depositphotos.com/3433891/33504/i/450/depositphotos_335048212-stock-photo-young-caucasian-woman-isolated-who.jpg', linkContent: 'https://www.youtube.com/watch?v=Lm77VCkf_do'},
    {id: '02', title: 'Tu voz, tu fuerza 2' , imgSrc: 'https://tuvoz.tv/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-05-at-7.26.35-PM.jpeg'}
  ];

  public currentPosition:number = 0;



  public nextImage():void{

    const next:number = this.currentPosition + 1;
    this.currentPosition = next == this.messageMediaElement.length ? 0 : next;

  }

  public prevImage():void{

    const prev:number = this.currentPosition - 1;
    this.currentPosition = prev < 0 ? this.messageMediaElement.length - 1 : prev;

  }

}
