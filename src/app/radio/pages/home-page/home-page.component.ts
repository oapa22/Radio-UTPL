import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firebase.service';
import { Podcast } from '../../../shared/interfaces/podcast.interface';
import { MediaElement } from '../../interfaces/media-element.interface';
import { Project } from '../../../shared/interfaces/project.interface';
import { Timestamp } from '@angular/fire/firestore';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'radio-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{

  public podcasts: Podcast[] = [];
  public recentProjects: Project[] = [];
  public projects: Project[] = [];
  public projectPrueba: Project = {content:'',date:Timestamp.now(),keywords:'',photo_filename:'',photo_url:'',summary:'',title:'Prueba',likes:0,};

  date: string[] = [];

  public recentProject1: Project | null = null;
  public recentProject2: Project | null = null;
  public recentProject3: Project | null = null;

  public mediaElementCarousel:MediaElement[] = [
    {id: '01', title: 'Una radio que es parte de la comunidad', imgSrc: 'https://firebasestorage.googleapis.com/v0/b/radioutpl.appspot.com/o/media%2Fimage_carrousel.png?alt=media&token=2e17e727-a307-48e1-82fa-ea578c449a69', linkContent: 'https://www.youtube.com/watch?v=Lm77VCkf_do'},
    {id: '02', title: 'Second Image', imgSrc: 'https://images.alphacoders.com/133/1330482.png'},
    {id: '03', title: 'Tree Image', imgSrc: 'https://firebasestorage.googleapis.com/v0/b/radioutpl.appspot.com/o/media%2Fimage_carrousel.png?alt=media&token=2e17e727-a307-48e1-82fa-ea578c449a69'}
  ];

  private unsubscribe$ = new Subject<void>();

  constructor(private firestore: FirestoreService){}

  public ngOnInit(): void {
    this.getPodcasts();
    this.getProjects();
  }

  public getPodcasts():void{
    this.firestore.getLatestDocuments<Podcast>('podcast','date',3).subscribe( podcast => {
      this.podcasts = podcast;
    });
  }

  public getProjects():void{
    this.firestore.getLatestDocuments<Project>('project','date',3)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(projects => {
      this.projects = projects;
      this.formatDateProjects(this.projects);
      console.log(this.projects);
    });
  }

  public formatDateProjects(projects:Project[]) {
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    for (let i = 0; i < projects.length; i++) {
        const date = projects[i].date.toDate();
        const dia = date.getDate();
        const mes = meses[date.getMonth()];
        const anio = date.getFullYear();
        this.date[i] = `${dia} de ${mes} de ${anio}`;
    }
  }

  public getRecentProjects(): void {
    this.firestore.getOrderedArray<Project>('project','date',3).subscribe(res => {
      this.recentProjects = res;
      this.recentProject1 = res[0];
      this.recentProject2 = res[1];
      this.recentProject3 = res[2];
      console.log('Proyectos recientes:', this.recentProjects);
      this.formatDates();
    });
  }

  public formatDates() {
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    for (let i = 0; i < 3; i++) {
      if (this.recentProjects[i]) {
        const date = this.recentProjects[i].date.toDate();
        const dia = date.getDate();
        const mes = meses[date.getMonth()];
        const anio = date.getFullYear();
        this.date[i] = `${dia} de ${mes} de ${anio}`;
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
