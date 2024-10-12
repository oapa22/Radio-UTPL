import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent implements OnInit{
  public valueLabel:string = '';

  /**
   * Propidad router: empleado para cambiar el contenido de la seccion
   */
  constructor(private router:Router){
  }
  ngOnInit(): void {
    if (this.router.url.includes('lista-podcasts')) {
      this.valueLabel = 'podcast';
    } else if (this.router.url.includes('lista-proyectos')) {
      this.valueLabel = 'proyecto';
    } else if (this.router.url.includes('lista-mensajes')) {
      this.valueLabel = 'mensaje';
    } else {
      this.router.navigate(['/radio-utpl/admin/']);
    }
  }



  //Funcion para cambiar el valor del contenido del boton.
  public updateButtonLabel(valueLabel:'podcast'|'proyecto'|'mensaje'):void{
    this.valueLabel = valueLabel;
  }


}
