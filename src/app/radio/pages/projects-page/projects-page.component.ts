import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firebase.service';
import { Projects } from '../../../shared/interfaces/projects.interface';

@Component({
  selector: 'radio-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css'
})
export class ProjectsPageComponent implements OnInit{
  public projects:Projects[] = [];

  constructor(private serviceProject:FirestoreService){}

  ngOnInit(): void {
    this.getProjects();
  }

  public getProjects():void{
    this.serviceProject.getCollection<Projects>('project').subscribe( res => {
      this.projects = res;
      console.log(this.projects);
    });
  }
}
