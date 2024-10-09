import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap  } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { FirestoreService } from '../../../radio/services/firebase.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'admin-card-template',
  templateUrl: './card-template.component.html',
  styleUrl: './card-template.component.css'
})
export class CardTemplateComponent implements OnInit{
  @Input() public imageSrc:string = '';
  @Input() public title:string = '';
  @Input() public date:string = '';
  @Input() public summary:string = '';
  @Input() public id:string = '';
  @Input() public paramRoute:'podcast' | 'proyecto' | 'mensaje' | '' = '';

  public route:string = '';

  public hasLoaded:boolean = false;

  constructor(
    private router:Router,

    private firestoreService:FirestoreService,
    private dialog:MatDialog
  ){}

  ngOnInit(): void {
    this.route =  this.paramRoute + '/'+this.id;
  }

  public naviagetToNewElement():void{
    this.router.navigate(['radio-utpl/admin/editar-'+this.route]);
  }

  public onLoad():void{
    this.hasLoaded = true;
  }

  public onDeleteElement():void{
    if(!this.id) throw Error('El elemento es requerido');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.title
    });

    dialogRef.afterClosed()
      .pipe(
        // filter((result:boolean) => result),
        // switchMap(() => this.firestoreService.deleteDoc(paramRoute,id)),
        // filter((wasDeleted:boolean) => wasDeleted)
      )
      .subscribe(() => {
        console.log('se eejcuto el confirmdialog');
        // this.router.navigate(['/heroes']);
      });
  }
}
