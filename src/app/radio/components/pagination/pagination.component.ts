import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirestoreService } from '../../services/firebase.service';
import { User } from '../../../shared/interfaces/user.interface';
import { Message } from '../../../shared/interfaces/message.interface';
import { Podcast } from '../../../shared/interfaces/podcast.interface';
import { Project } from '../../../shared/interfaces/project.interface';
import { CounterDocService } from '../../../shared/services/counter-doc.service';
import { CounterDocs } from '../../../shared/interfaces/counter-docs.interface';

@Component({
  selector: 'radio-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit{
  public docs: User[] | Message[] | Podcast[] | Project[] = [];
  @Output() public userEmitter:EventEmitter<User[]> = new EventEmitter();
  @Output() public messageEmitter:EventEmitter<Message[]> = new EventEmitter();
  @Output() public podcastEmitter:EventEmitter<Podcast[]> = new EventEmitter();
  @Output() public projectEmitter:EventEmitter<Project[]> = new EventEmitter();
  @Input() public path!: 'user'|'podcast'|'message'|'project';
  @Input() public numberDocsShow:number = 3;

  public currentIndex: number = 1; //indice 1
  public totalPages: number = 0; //ultimo indece
  public windowSize:number = 3; //limite de ventana
  public windowArray: number[] = []; //ventana para visualizar los indices
  public totalDocs: number = 0;

  private counterDocs!:CounterDocs;

  constructor(private serviceFireStore:FirestoreService, private counterService:CounterDocService) {
    //inicializar ventana
    this.windowArray
  }
  // TODO: colocar oputput para enviar los documentos al principal, y que del principal el componente de busqueda
  //  pase el tema a buscar a este compoente, y de esa forma se puede controlar todo desde aqui.
  // T\HAY UN PROBLEMA CON LA CARGA DE LOS PROYECTOS, AL PARECER SE EEJCUTA DOS VECES EN OINIT DEBIDO QUE EN EL MAIN SE EESTA TRAYENDO DOCUMENTOS.
  public ngOnInit(): void {
    this.getCollection(this.path);
    this.initialPagination(this.path);
  }

  public getCollection(path: 'user'|'podcast'|'message'|'project'):void{

    // this.serviceFireStore.getFirstPage<Project>(this.numberDocsShow,path).subscribe(res => {
    //   console.log('entro al if de project');
    //   this.docs = res;
    //   this.projectEmitter.emit(this.docs as Project[]);
    //   this.initialPagination();
    // });


    if(path == 'user'){
      this.serviceFireStore.getCollection<User>(path).subscribe(res => {
        this.docs = res;
        this.userEmitter.emit(this.docs as User[]);
      });
    } else if(path == 'podcast'){
      this.serviceFireStore.getCollection<Podcast>(path).subscribe(res => {
        this.docs = res;
        this.podcastEmitter.emit(this.docs as Podcast[]);
      });
    } else if(path == 'message'){
      this.serviceFireStore.getCollection<Message>(path).subscribe(res => {
        this.docs = res;
        this.messageEmitter.emit(this.docs as Message[]);
      });
    } else if(path == 'project'){
      this.serviceFireStore.getCollection<Project>(path).subscribe(res => {
        console.log('entro al if de project');
        this.docs = res;
        this.projectEmitter.emit(this.docs as Project[]);
      });
    }
  }

  public initialPagination(path: 'user'|'podcast'|'message'|'project'):void{

    this.counterService.getCounderDocs().subscribe(counterDocsRes => {
      if(path == 'user'){
        this.totalDocs = counterDocsRes.user;
      } else if(path == 'podcast'){
        this.totalDocs = counterDocsRes.podcast;
      } else if(path == 'message'){
        this.totalDocs = counterDocsRes.message;
      } else if(path == 'project'){
        this.totalDocs = counterDocsRes.project;
      }
      console.log("totalDocs: ",this.totalDocs);
      console.log("numberDocsShow: ",this.numberDocsShow);
      this.totalPages = this.totalDocs/this.numberDocsShow;
      console.log("totalPages: ",this.totalPages);

      if(this.totalPages >= 6){
        for (let index = 1; index <= this.windowSize; index++) {
          this.windowArray.push(index+1);
        }
      } else {
        for (let index = 0; index < this.totalPages; index++) {
          this.windowArray.push(index+1);
        }
      }
    });

  }

  /**
   * Actualizacion de la ventana
   * El primer if se emplea para cambiar el indice actual del usuario, si el indice no se encuentra en el
   * intervalo de especificado no va a actualizar.
   */
  public updatePagination(action:'next'|'prev'){

    if(action == 'next'){
      for (let index = 0; index < this.windowSize; index++) {
        this.windowArray[index] += 1;
      }
    }else{
      for (let index = 0; index < this.windowSize; index++) {
        this.windowArray[index] -= 1;
      }
    }
  }

  //Funcion para cambiar el indice actual por el elegido
  public goToPage(destIndex: number) {

    if(this.totalPages < 6){
      this.currentIndex = destIndex;
    } else {

      if((this.currentIndex + 1) == destIndex){ //Determina si avanza el indice una posicion
        this.nextPage();
      } else if((this.currentIndex - 1) == destIndex) { //Determina si retrocedio el indice una posicion
        this.prevPage();
      } else if(destIndex == this.windowArray[this.windowSize - 1]) { // Determina si el indice actual es igual al limite de la ventan desde el inicio (4 == windowArray[2])
        this.currentIndex = this.windowSize;
        this.nextPage();
      } else if(destIndex == this.windowArray[0]){ //Determina si el indice actual es igual al limite de la ventan desde el final
        this.currentIndex = this.totalPages - 2;
        this.prevPage();
      } else { //Actualiza el indice actual al indice destino
        this.currentIndex = destIndex;
      }

    }
  }


  //Aumenta el indice, pero el if simplemente accede cuando el total de paginas es mayor o igual a 6 y actualiza la ventana
  public nextPage():void {
    // this.counterService.incrementCounter('podcast').then( (res) => {
    //   console.log('Se eejcuto', res);
    // }).catch((error) => {
    //   console.error('Error al actualizar el mensaje:', error);
    // });

    this.currentIndex += 1;

    if((this.currentIndex > this.windowSize) && this.currentIndex < (this.totalPages - 1)){
      this.updatePagination('next');
    }
  }

  //Disminuye el indice, pero el if simplemente accede cuando el total de paginas es mayor o igual a 6 y actualiza la ventana
  public prevPage():void {
    this.currentIndex -= 1;

    if((this.currentIndex > (this.windowSize - 1)) && this.currentIndex < (this.totalPages - 2)){
      this.updatePagination('prev');
    }
  }

  public setFirstwindowArray():void{
    this.currentIndex = 1;
    let aux:number = 1;
    if(this.totalPages >= 6){
      for (let index = 0; index < this.windowSize; index++) {
        aux += 1;
        this.windowArray[index] = aux;
      }
    }
  }

  public setLastwindowArray():void{
    this.currentIndex = this.totalPages;
    let aux:number = -3;
    if(this.totalPages >= 6){
      for (let index = 0; index < this.windowSize; index++) {
        this.windowArray[index] = this.totalPages + aux ;
        aux += 1;
      }
    }
  }


}
