import { Component } from '@angular/core';

@Component({
  selector: 'radio-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  currentPage: number = 1; //indice 1
  totalPages: number = 24; //ultimo indece
  indexPagination: number[] = []; //ventana para visualizar los indices
  indexWindow:number = 3; //limite de ventana

  constructor() {
    //inicializar ventana
    for (let index = 0; index < this.indexWindow; index++) {
      this.indexPagination.push(index+2)
    }

  }

  //Funcion para cambiar el indice actual por
  goToPage(page: number) {

    this.currentPage = page;

    this.updatePagination(page);

  }

 /**
 * Actualizacion de la ventana
 * El primer if se emplea para cambiar el indice actual del usuario, si el indice no se encuentra en el
 * intervalo de especificado no va a actualizar.
 */
  updatePagination(page:number){
    let pageUpdate:number = 0;
    let update:boolean = false;


    if((this.currentPage >= 3) && (this.currentPage <= 22)){
      pageUpdate = page - 1;
      update = true;
    } else if (this.currentPage == 1){
      pageUpdate = this.currentPage + 1;
      update = true;
    } else if (this.currentPage == this.totalPages){
      pageUpdate = this.totalPages - this.indexPagination.length;
      update = true;
    }

    if(update){
      for (let index = 0; index < this.indexPagination.length; index++) {
        this.indexPagination[index] = pageUpdate;
        pageUpdate += 1;
      }
    }

  }

  //Aumenta el indice y actualiza la ventana
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination(this.currentPage);
    }
  }

  //Disminuye el indice y actualiza la ventana
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination(this.currentPage);
    }
  }
}
