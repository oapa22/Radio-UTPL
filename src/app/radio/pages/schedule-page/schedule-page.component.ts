import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firebase.service';
import { Podcasts } from '../../../shared/interfaces/podcasts.interfaces';


@Component({
  selector: 'radio-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.css'
})
export class SchedulePageComponent implements OnInit{
  podcasts: Podcasts[] = [];

  constructor(private firestore:FirestoreService){

  }
  ngOnInit(): void {
    this.getPodcasts();
  }

  public getPodcasts(){
    this.firestore.getCollection<Podcasts>('podcast').subscribe( res => {
      this.podcasts = res;
    });
  }
}
