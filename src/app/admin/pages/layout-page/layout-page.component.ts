import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  public valueLabel:string = '';

  /**
   * Propidad router: empleado para cambiar el contenido de la seccion
   */
  constructor(private router:Router){

  }

  //Funcion para cambiar el valor del contenido del boton.
  public updateButtonLabel(valueLabel:'podcast'|'project'|'message'):void{
    this.valueLabel = valueLabel;
  }

  public navigateToSection():void{
    const valueLink = 'radio/admin/new-'+ this.valueLabel;
    if(this.valueLabel){
      console.log(valueLink);
      this.router.navigate([valueLink]);
    }
  }

}
