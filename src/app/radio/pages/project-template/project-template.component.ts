import { Component, OnInit } from '@angular/core';
import { Project } from '../../../shared/interfaces/project.interface';
import { FirestoreService } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'radio-project-template',
  templateUrl: './project-template.component.html',
  styleUrl: './project-template.component.css'
})
export class ProjectTemplateComponent implements OnInit{
  public project?:Project;
  public likeValue:boolean = false;

  constructor(
    private firestoreService:FirestoreService,
    private activatedRouter:ActivatedRoute,
    private router:Router,

  ){}

  public ngOnInit(): void {
    this.activatedRouter.params.pipe(
      switchMap( ({id}) => this.firestoreService.getDocProject<Project>('project',id))
    ).subscribe(project => {

      if (!project) return this.router.navigate(['/radio-utpl/proyectos/']);

      this.project = project;
      console.log(this.project.id);
      return;
    })
  }

  public toogleLikeValue(){
    this.likeValue = !this.likeValue;
  }
}
