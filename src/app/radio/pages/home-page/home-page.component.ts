import { Component } from '@angular/core';
import { MediaElement } from '../../interfaces/media-element.interface';


@Component({
  selector: 'radio-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public mediaElementCarousel:MediaElement[] = [
    {id: '01', title: 'First Image', imgSrc: 'https://i.iplsc.com/-/000E5FZ3NYWLDYS1-C461-F4.jpg'},
    {id: '02', title: 'Second Image', imgSrc: 'https://cdn.mos.cms.futurecdn.net/jZbskesRhzALfcqHx9eiDb.jpg'},
    {id: '03', title: 'Tree Image', imgSrc: 'https://static.bandainamcoent.eu/high/elden-ring/elden-ring/03-news/Starter_Guide/Elden_Ring_game_screen.jpg'}
  ]


}
