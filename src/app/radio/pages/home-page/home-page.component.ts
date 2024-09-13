import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firebase.service';
import { Podcasts } from '../../../shared/interfaces/podcasts.interface';
import { MediaElement } from '../../interfaces/media-element.interface';

@Component({
  selector: 'radio-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{

  public podcasts: Podcasts[] = [];

  public mediaElementCarousel:MediaElement[] = [
    {id: '01', title: 'Una radio que es parte de la comunidad', imgSrc: 'https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg', linkContent: 'https://www.youtube.com/watch?v=Lm77VCkf_do'},
    {id: '02', title: 'Second Image', imgSrc: 'https://images.alphacoders.com/133/1330482.png'},
    {id: '03', title: 'Tree Image', imgSrc: 'https://wallpaperbat.com/img/192020-minimal-forest-wallpaper-top-free-minimal-forest-background.jpg', linkContent: 'https://www.youtube.com/watch?v=Lm77VCkf_do'}
  ];

  public lenguas: Podcasts = {
    id: '',
    title: '',
    date: '',
    category: '',
    image: '',
    content: '',
  };

  constructor(private firestore: FirestoreService,){

  }

  ngOnInit(): void {
    this.getPodcasts()
  }

  public getPodcasts(){
    this.firestore.getCollection<Podcasts>('podcast').subscribe( res => {
      this.podcasts = res;
      console.log('hola',this.podcasts)
    });
  }

}
