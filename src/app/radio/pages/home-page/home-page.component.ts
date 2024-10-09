import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firebase.service';
import { Podcast } from '../../../shared/interfaces/podcast.interface';
import { MediaElement } from '../../interfaces/media-element.interface';
import { Project } from '../../../shared/interfaces/project.interface';

@Component({
  selector: 'radio-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{

  public podcasts: Podcast[] = [];
  public projects: Project[] = [];
  public projectPrueba: Project = {content:'',date:'',keywords:'',photo_filename:'',photo_url:'',summary:'',title:'Prueba'};

  public mediaElementCarousel:MediaElement[] = [
    {id: '01', title: 'Una radio que es parte de la comunidad', imgSrc: 'https://firebasestorage.googleapis.com/v0/b/radioutpl.appspot.com/o/media%2Fimage_carrousel.png?alt=media&token=2e17e727-a307-48e1-82fa-ea578c449a69', linkContent: 'https://www.youtube.com/watch?v=Lm77VCkf_do'},
    {id: '02', title: 'Second Image', imgSrc: 'https://images.alphacoders.com/133/1330482.png'},
    {id: '03', title: 'Tree Image', imgSrc: 'https://firebasestorage.googleapis.com/v0/b/radioutpl.appspot.com/o/media%2Fimage_carrousel.png?alt=media&token=2e17e727-a307-48e1-82fa-ea578c449a69'}
  ];


  constructor(private firestore: FirestoreService){}

  ngOnInit(): void {
    this.getPodcasts();
    this.getProjects();
  }

  public getPodcasts():void{
    this.firestore.getLatestDocuments<Podcast>('podcast',3).subscribe( podcast => {
      this.podcasts = podcast;
      console.log('hola',this.podcasts)
    });
  }

  public getProjects():void{
    this.firestore.getLatestDocuments<Project>('project',3).subscribe(projects => {
      this.projects = projects;
      console.log('Proyectos',this.projects);
    });
  }

}
