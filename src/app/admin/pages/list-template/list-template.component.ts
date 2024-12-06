import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Podcast } from '../../../shared/interfaces/podcast.interface';
import { Project } from '../../../shared/interfaces/project.interface';
import { Message } from '../../../shared/interfaces/message.interface';
import { FirestoreService } from '../../../radio/services/firebase.service';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
    selector: 'admin-list-template',
    templateUrl: './list-template.component.html',
    styleUrl: './list-template.component.css',
    standalone: false
})
export class ListTemplateComponent implements OnInit{
  public podcasts: Podcast[] = [];
  public projects: Project[] = [];
  public messages: Message[] = [];
  public users: User[] = [];
  public param: string = '';
  public valueLabel: string = '';

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private fireStoreService: FirestoreService
  ){}

  ngOnInit(): void {
      if (this.router.url.includes('lista-podcasts')) {
        this.fireStoreService.getCollection<Podcast>('podcast').subscribe(res => {
          this.podcasts = res;
        });
        this.valueLabel = 'podcast';
      } else if (this.router.url.includes('lista-proyectos')) {
        this.fireStoreService.getCollection<Project>('project').subscribe(res => {
          this.projects = res;
        });
        this.valueLabel = 'proyecto';
      } else if (this.router.url.includes('lista-mensajes')) {
        this.fireStoreService.getCollection<Message>('message').subscribe(res => {
          this.messages = res;
        });
        this.valueLabel = 'mensaje';
      } else if(this.router.url.includes('lista-usuarios')){
        this.fireStoreService.getCollection<User>('user').subscribe(res => {
          this.users = res;
        });
        this.valueLabel = 'usuario';
      } else {
        this.router.navigate(['/radio-utpl/admin/']);

      }

  }

  public navigateToSection(): void {
    const valueLink = 'radio-utpl/admin/nuevo-' + this.valueLabel;
    if (this.valueLabel) {
      console.log(valueLink);
      this.router.navigate([valueLink]);
    }
  }

  public formatDate(timestamp: any): string {
    if (timestamp?.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('es-ES', options);
    }
    return '';
  }

}
