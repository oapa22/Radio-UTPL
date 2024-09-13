import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firebase.service';
import { Podcast } from '../../../shared/interfaces/podcast.interface';


@Component({
  selector: 'radio-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.css'
})
export class SchedulePageComponent implements OnInit{
  podcasts: Podcast[] = [];

  constructor(private firestore:FirestoreService){

  }
  ngOnInit(): void {
    this.getPodcasts();
  }

  public getPodcasts(){
    this.firestore.getCollection<Podcast>('podcast').subscribe( res => {
      this.podcasts = res;
    });
  }
}
