import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firebase.service';
import { Podcast } from '../../../shared/interfaces/podcast.interface';
import { MediaElement } from '../../interfaces/media-element.interface';
import { Project } from '../../../shared/interfaces/project.interface';
import { Timestamp } from '@angular/fire/firestore';

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
    {id: '01', title: 'Una radio que es parte de la comunidad', imgSrc: 'https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg', linkContent: 'https://www.youtube.com/watch?v=Lm77VCkf_do'},
    {id: '02', title: 'Second Image', imgSrc: 'https://images.alphacoders.com/133/1330482.png'},
    {id: '03', title: 'Tree Image', imgSrc: 'https://wallpaperbat.com/img/192020-minimal-forest-wallpaper-top-free-minimal-forest-background.jpg', linkContent: 'https://www.youtube.com/watch?v=Lm77VCkf_do'}
  ];


  constructor(private firestore: FirestoreService){}

  ngOnInit(): void {
    this.getRecentProjects();
    this.getPodcasts();
    this.getProjects();
  }

  public getPodcasts():void{
    this.firestore.getCollection<Podcast>('podcast').subscribe( res => {
      this.podcasts = res;
      console.log('hola',this.podcasts)
    });
  }

  public getProjects():void{
    this.firestore.getLatestDocPodcast<Project>('project').subscribe(projects => {
      this.projects = projects;
    });
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
  
  formatDates() {
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
}
