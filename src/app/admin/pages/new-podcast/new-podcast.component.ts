import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../../radio/services/firebase.service';
import { Podcast } from '../../../shared/interfaces/podcast.interface';
import { Timestamp } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ResquestLoaderRenderService } from '../../../shared/renders/resquest-loader.service';

@Component({
  selector: 'admin-new-podcast',
  templateUrl: './new-podcast.component.html',
  styleUrls: ['./new-podcast.component.css'],
  providers: [DatePipe]
})
export class NewPodcastComponent implements OnInit{
  date = '';
  public podcast: Podcast = {
    id: '',
    title: '',
    date: Timestamp.now(),
    frame: '',
  };

  // Form para agrupar los elementos del Podcast
  public podcastForm = new FormGroup({
    title: new FormControl<string>(''),
    frame: new FormControl<string>(''),
  });

  public currentDate:string = '';
  public currentRoute:string = '';

  constructor(
    private firestore: FirestoreService,
    private datePipe: DatePipe,
    private requestLoader:ResquestLoaderRenderService,
    private activatedRouter:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.formatDate();
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
      this.formatDate();
    }
  }

  createPodcast() {
    const path = 'podcast';
    const id = this.firestore.createId();

    this.podcast = this.currentPodcastFormValue;

    this.podcast.id = id;
    this.podcast.date = Timestamp.now();

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

  public get currentPodcastFormValue():Podcast{
    const podcast = this.podcastForm.value as Podcast;
    return podcast;
  }

  public updatePodcast():void{
    let title:string = 'CREANDO PODCAST';
    let description:string = 'Espere un momento mientras los datos se suben a la nube.';

    this.requestLoader.initRequestLoader(title,description);
  }

}
