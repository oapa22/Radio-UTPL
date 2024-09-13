import { Component, Input } from '@angular/core';
import { Project } from '../../interfaces/project.interface';

@Component({
  selector: 'shared-card-project',
  templateUrl: './card-projects.component.html',
  styleUrl: './card-projects.component.css'
})
export class CardProjectsComponent {
  @Input()
  public project!:Project;

}
