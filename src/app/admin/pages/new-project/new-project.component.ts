import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../../radio/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Project } from './../../../shared/interfaces/project.interface';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'admin-new-message',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent {
  imageSrc: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  summaryError: boolean = false;

  date = '';
  project: Project = {
    id: '',
    title: '',
    date: Timestamp.now(),
    keywords: '',
    summary: '',
    photo_url: '',
    photo_filename: '',
    content: '',
    likes: 0,
  }

  constructor(
    private firestore: FirestoreService,
    private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.formatDate();
  }

  selectImage(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  createMessage() {
    const wordCount = this.project.summary.trim().split(/\s+/).length;

    if (wordCount < 15 || wordCount > 20) {
      this.summaryError = true;
      return;  
    } else {
      this.summaryError = false;  
    }

    if (this.selectedFile) {
      const filePath = `images_project/${this.selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);

      task.snapshotChanges().toPromise().then(() => {
        fileRef.getDownloadURL().toPromise().then(url => {
          this.project.photo_url = url;
          this.project.photo_filename = this.selectedFile?.name || '';
          this.createMessageF();
        }).catch(error => console.log('Error getting download URL', error));
      }).catch(error => console.log('Error uploading file', error));
    }
  }

  createMessageF() {
    const path = 'project';
    const id = this.firestore.createId();
    this.project.id = id;

    this.firestore.createDoc(this.project, path, id).then(res => {
      console.log('respuesta ->', res);
    }).catch(error => console.log('Error creating document', error));
  }

  formatDate() {
    const date = this.project.date.toDate();
  
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
  
    const dia = date.getDate();
    const mes = meses[date.getMonth()]; 
    const anio = date.getFullYear(); 

    this.date = `${dia} de ${mes} de ${anio}`;
  }
}
