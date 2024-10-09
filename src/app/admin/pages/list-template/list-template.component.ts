import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Podcast } from '../../../shared/interfaces/podcast.interface';
import { Project } from '../../../shared/interfaces/project.interface';
import { Message } from '../../../shared/interfaces/message.interface';
import { FirestoreService } from '../../../radio/services/firebase.service';

@Component({
  selector: 'admin-list-template',
  templateUrl: './list-template.component.html',
  styleUrl: './list-template.component.css'
})
export class ListTemplateComponent implements OnInit{
  public podcasts:Podcast[] = [];
  public projects:Project[] = [];
  public messages:Message[] = [];
  public param:string = '';
  public valueLabel:string = '';

  constructor(
    private router:Router,
    private activatedRouter:ActivatedRoute,
    private fireStoreService: FirestoreService
  ){}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe( params => {
      this.param = params['collection'];

      if(this.param == 'podcasts'){
        this.fireStoreService.getCollection<Podcast>('podcast').subscribe( res => {
          this.podcasts = res;
        });
        this.valueLabel = 'podcast';
      } else if(this.param == 'proyectos'){
        this.fireStoreService.getCollection<Project>('project').subscribe(res => {
          this.projects = res;
        });
        this.valueLabel = 'proyecto';
      } else if (this.param == 'mensajes'){
        this.fireStoreService.getCollection<Message>('message').subscribe(res => {
          this.messages = res;
        });
        this.valueLabel = 'mensaje';
      } else {
        this.router.navigate(['/radio-utpl/admin/']);
      }

      return ;
    })
  }

  public navigateToSection():void{
    const valueLink = 'radio-utpl/admin/nuevo-'+ this.valueLabel;
    if(this.valueLabel){
      console.log(valueLink);
      this.router.navigate([valueLink]);
    }
  }

}
