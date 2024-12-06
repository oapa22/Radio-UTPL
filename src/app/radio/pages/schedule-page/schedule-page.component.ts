import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firebase.service';
import { Podcast } from '../../../shared/interfaces/podcast.interface';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';


@Component({
    selector: 'radio-schedule-page',
    templateUrl: './schedule-page.component.html',
    styleUrl: './schedule-page.component.css',
    standalone: false
})
export class SchedulePageComponent implements OnInit{
  public podcasts: Podcast[] = [];

  public urlSpotify:string = 'https://open.spotify.com/embed/playlist/37i9dQZF1E4yPOuEyv4Vyw?utm_source=generator';
  public safeUrl: SafeResourceUrl = '';
  public podcastFrame: SafeHtml = '';

  // DomSanitizer es empleado para verificar si la url es validad y no tenga vulneravilidades
  constructor(private firestore:FirestoreService, private sanitizer: DomSanitizer){
  }

  ngOnInit(): void {
    this.getPodcasts();


  }

  public getPodcasts(){
    this.firestore.getLatestDocuments<Podcast>('podcast','date',9).subscribe( podcast => {
      this.podcasts = podcast;
      console.log('hola',this.podcasts)
    });

    // this.firestore.getCollection<Podcast>('podcast').subscribe( res => {
    //   this.podcasts = res;

    //   this.podcastFrame = this.sanitizer.bypassSecurityTrustHtml(this.podcasts[0].frame);
    //   this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.podcasts[1].frame);
    // });
  }
}
