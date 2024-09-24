import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../../radio/services/firebase.service';
import { Podcast } from '../../../shared/interfaces/podcast.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'admin-new-podcast',
  templateUrl: './new-podcast.component.html',
  styleUrl: './new-podcast.component.css'
})
export class NewPodcastComponent implements OnInit{
  public podcast: Podcast = {
    id: '',
    title: '',
    date: '',
    frame: '',
  }

  // Form para agrupar los elementos del Podcast
  public podcastForm = new FormGroup({
    title: new FormControl<string>(''),
    frame: new FormControl<string>(''),
  });

  public currentDate:string = '';
  public currentRoute:string = '';

  constructor(
    private firestore: FirestoreService,

    private activatedRouter:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    if(this.router.url.includes('editar-podcast')) {
      this.activatedRouter.params.pipe(
        switchMap( ({id}) => this.firestore.getDocPodcast<Podcast>('podcast',id) )
      ).subscribe(podcast => {

        if (!podcast) return this.router.navigateByUrl('/');

        this.podcastForm.reset(podcast);

        return;
      });
    } else {
      this.currentDate = this.formatDate(new Date());
    }
  }

  createPodcast() {
    const path = 'podcast';
    const id = this.firestore.createId();

    this.podcast = this.currentPodcastFormValue;

    this.podcast.id = id;
    this.podcast.date = this.currentDate;

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

  public get currentPodcastFormValue():Podcast{
    const podcast = this.podcastForm.value as Podcast;

    return podcast;
  }

}
