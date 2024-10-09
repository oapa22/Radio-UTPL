import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../../radio/services/firebase.service';
import { Podcast } from '../../../shared/interfaces/podcast.interface';
import { Timestamp } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'admin-new-podcast',
  templateUrl: './new-podcast.component.html',
  styleUrls: ['./new-podcast.component.css'],
  providers: [DatePipe]
})
export class NewPodcastComponent implements OnInit {
  date = '';
  podcast: Podcast = {
    id: '',
    title: '',
    date: Timestamp.now(),
    frame: '',
  };

  constructor(
    private firestore: FirestoreService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.formatDate();
  }

  createPodcast() {
    const path = 'podcast';
    const id = this.firestore.createId();
    this.podcast.id = id;

    this.firestore.createDoc(this.podcast, path, id).then(res => {
      console.log('respuesta ->', res);
    });
  }

  formatDate() {
    const date = this.podcast.date.toDate();
  
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
  
    const dia = date.getDate();
    const mes = meses[date.getMonth()]; 
    const anio = date.getFullYear(); 

    this.date = `${dia} de ${mes} de ${anio}`;
  }
  
}
