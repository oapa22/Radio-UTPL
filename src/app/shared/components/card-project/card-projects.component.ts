import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../interfaces/project.interface';

@Component({
  selector: 'shared-card-project',
  templateUrl: './card-projects.component.html',
  styleUrl: './card-projects.component.css'
})
export class CardProjectsComponent implements OnInit{

  @Input()
  public project!:Project;

  public hasLoaded:boolean = false;

  ngOnInit(): void {
    if(!this.project) throw new Error('Project property is required');
  }

  public onLoad():void{
    console.log('load');
    this.hasLoaded = true;
  }
}
