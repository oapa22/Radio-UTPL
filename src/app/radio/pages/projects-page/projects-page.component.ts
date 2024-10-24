import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firebase.service';
import { Project } from '../../../shared/interfaces/project.interface';

@Component({
  selector: 'radio-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css'
})
export class ProjectsPageComponent implements OnInit{

  public projects:Project[] = [];

  constructor(){}

  ngOnInit(): void {
  }

  // private serviceProject:FirestoreService
  // public getProjects():void{
  //   this.serviceProject.getCollection<Project>('project').subscribe( res => {
  //     this.projects = res;
  //   });
  // }

  public getDocs(projects: Project[]):void{
    this.projects = projects;
  }
}
