import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../../radio/services/firebase.service';
import { Podcast } from '../../../shared/interfaces/podcast.interface';

@Component({
  selector: 'admin-new-podcast',
  templateUrl: './new-podcast.component.html',
  styleUrl: './new-podcast.component.css'
})
export class NewPodcastComponent {
  podcast: Podcast = {
    id: '',
    title: '',
    date: '',
    frame: '',
  }

  constructor(
    private firestore: FirestoreService,){
  }
  
  ngOnInit(): void {
    this.podcast.date = this.formatDate(new Date());
  }

  createPodcast() {
    const path = 'podcast';
    const id = this.firestore.createId();
    this.podcast.id = id;

    this.firestore.createDoc(this.podcast, path, id).then(res => {
      console.log('respuesta ->', res);
    });
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  }

}
