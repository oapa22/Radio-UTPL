import { Component, Input } from '@angular/core';
import { Projects } from '../../interfaces/projects.interface';

@Component({
  selector: 'shared-card-project',
  templateUrl: './card-projects.component.html',
  styleUrl: './card-projects.component.css'
})
export class CardProjectsComponent {
  @Input()
  public project!:Projects;

}
