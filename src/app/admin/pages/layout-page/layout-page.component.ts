import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  public valueLabel:string = 'podcast';

  /**
   * Propidad router: empleado para cambiar el contenido de la seccion
   */
  constructor(private router:Router){

  }

  //Funcion para cambiar el valor del contenido del boton.
  public updateButtonLabel(valueLabel:'podcast'|'proyecto'|'mensaje'):void{
    this.valueLabel = valueLabel;
  }



}
