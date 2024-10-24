import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirestoreService } from '../../services/firebase.service';
import { User } from '../../../shared/interfaces/user.interface';
import { Message } from '../../../shared/interfaces/message.interface';
import { Podcast } from '../../../shared/interfaces/podcast.interface';
import { Project } from '../../../shared/interfaces/project.interface';

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

  public currentPage: number = 1; //indice 1
  public totalPages: number = 0; //ultimo indece
  public indexPagination: number[] = []; //ventana para visualizar los indices
  public indexWindow:number = 3; //limite de ventana
  public totalDocs: number = 0;

  constructor(private serviceFireStore:FirestoreService) {
    //inicializar ventana
  }
  // TODO: colocar oputput para enviar los documentos al principal, y que del principal el componente de busqueda
  //  pase el tema a buscar a este compoente, y de esa forma se puede controlar todo desde aqui.
  // T\HAY UN PROBLEMA CON LA CARGA DE LOS PROYECTOS, AL PARECER SE EEJCUTA DOS VECES EN OINIT DEBIDO QUE EN EL MAIN SE EESTA TRAYENDO DOCUMENTOS.
  public ngOnInit(): void {
    this.getCollection(this.path);
    console.log("entro al if ");
  }

  public getCollection(path: 'user'|'podcast'|'message'|'project'):void{
    if(path == 'user'){
      this.serviceFireStore.getCollection<User>(path).subscribe(res => {
        this.docs = res;
        this.initialPagination();
        this.userEmitter.emit(this.docs as User[]);
      });
    } else if(path == 'podcast'){
      this.serviceFireStore.getCollection<Podcast>(path).subscribe(res => {
        this.docs = res;
        this.initialPagination();
        this.podcastEmitter.emit(this.docs as Podcast[]);
      });
    } else if(path == 'message'){
      this.serviceFireStore.getCollection<Message>(path).subscribe(res => {
        this.docs = res;
        this.initialPagination();
        this.messageEmitter.emit(this.docs as Message[]);
      });
    } else if(path == 'project'){
      this.serviceFireStore.getCollection<Project>(path).subscribe(res => {
        this.docs = res;
        this.projectEmitter.emit(this.docs as Project[]);
        this.initialPagination();
      });
    }
  }

  public initialPagination():void{
    this.totalDocs = this.docs.length;
    console.log("totalDocs: ",this.totalDocs);
    console.log("numberDocsShow: ",this.numberDocsShow);

    this.totalPages = this.totalDocs/this.numberDocsShow;
    console.log("Total pages: ",this.totalPages);
    if(this.totalPages >= 6){
      for (let index = 0; index < this.indexWindow; index++) {
        this.indexPagination.push(index+2);
      }
    } else {
      for (let index = 0; index < this.totalPages; index++) {
        this.indexPagination.push(index+1);
      }
    }
  }

  //Funcion para cambiar el indice actual por el elegido
  public goToPage(page: number) {
    this.currentPage = page;

    if(this.totalPages >= 6){
      this.updatePagination(page);
    }
  }

 /**
 * Actualizacion de la ventana
 * El primer if se emplea para cambiar el indice actual del usuario, si el indice no se encuentra en el
 * intervalo de especificado no va a actualizar.
 */
  public updatePagination(page:number){
    let pageUpdate:number = 0;
    let update:boolean = false;


    if((this.currentPage >= 3) && (this.currentPage <= (this.totalPages-2) )){
      pageUpdate = page - 1;
      update = true;
    } else if (this.currentPage == 1){
      pageUpdate = this.currentPage + 1;
      update = true;
    } else if (this.currentPage == this.totalPages){
      pageUpdate = this.totalPages - this.indexPagination.length;
      update = true;
    }

    if(this.totalPages >= 6){
      if(update){
        for (let index = 0; index < this.indexPagination.length; index++) {
          this.indexPagination[index] = pageUpdate;
          pageUpdate += 1;
        }
      }
    }

  }

  //Aumenta el indice y actualiza la ventana
  public prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination(this.currentPage);
    }
  }

  //Disminuye el indice y actualiza la ventana
  public nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination(this.currentPage);
    }
  }
}
