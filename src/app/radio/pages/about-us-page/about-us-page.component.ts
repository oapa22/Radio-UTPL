import { Component } from '@angular/core';
import { MediaElement } from '../../interfaces/media-element.interface';

@Component({
  selector: 'radio-about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.css'
})
export class AboutUsPageComponent {
  public mediaTeamMediaLab:MediaElement[] = [
    {id: '01',title:'Técnico de Laboratorio', description: 'LOURDES KATHERINE QUEZADA LOAIZA', imgSrc: 'https://e7.pngegg.com/pngimages/820/233/png-clipart-management-service-business-consultant-employment-students-company-service.png'},
    {id: '02',title:'Técnico de Laboratorio', description: 'LOURDES KATHERINE QUEZADA LOAIZA', imgSrc: 'https://e7.pngegg.com/pngimages/820/233/png-clipart-management-service-business-consultant-employment-students-company-service.png'},
    {id: '03',title:'Técnico de Laboratorio', description: 'LOURDES KATHERINE QUEZADA LOAIZA', imgSrc: 'https://e7.pngegg.com/pngimages/820/233/png-clipart-management-service-business-consultant-employment-students-company-service.png'},
    {id: '04',title:'Técnico de Laboratorio', description: 'LOURDES KATHERINE QUEZADA LOAIZA', imgSrc: 'https://e7.pngegg.com/pngimages/820/233/png-clipart-management-service-business-consultant-employment-students-company-service.png'}
  ]
}
