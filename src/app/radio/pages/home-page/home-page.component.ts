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
    {id: '01', title: 'Una radio que es parte de la comunidad', imgSrc: 'https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg', linkContent: 'https://www.youtube.com/watch?v=Lm77VCkf_do'},
    {id: '02', title: 'Second Image', imgSrc: 'https://images.alphacoders.com/133/1330482.png'},
    {id: '03', title: 'Tree Image', imgSrc: 'https://wallpaperbat.com/img/192020-minimal-forest-wallpaper-top-free-minimal-forest-background.jpg', linkContent: 'https://www.youtube.com/watch?v=Lm77VCkf_do'}
  ];


  constructor(private firestore: FirestoreService){}

  ngOnInit(): void {
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
    this.firestore.getCollection<Project>('project').subscribe( res => {
      this.projects = res;
    });
  }

}
