import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firebase.service';
import { Podcasts } from '../../../shared/interfaces/podcasts.interface';



@Component({
  selector: 'radio-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{

  public podcasts: Podcasts[] = [];

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

  getPodcasts(){
    this.firestore.getCollection<Podcasts>('podcast').subscribe( res => {
      this.podcasts = res;
      console.log('hola',this.podcasts)
    });
  }
}
