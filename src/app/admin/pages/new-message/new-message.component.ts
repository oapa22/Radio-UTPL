import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../../radio/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Message } from './../../../shared/interfaces/message.interface';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'admin-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent {
  imageSrc: string | ArrayBuffer | null = null;
  audioSrc: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  selectedAudio: File | null = null;

  message: Message = {
    id: '',
    name: '',
    date: '',
    photo_url: '',
    photo_filename: '',
    audio_filename: '',
    audio_url: '',
  }

  public currentRoute:string = '';
  public podcastForm = new FormGroup({
    name: new FormControl<string>(''),
    photo_url: new FormControl<string>(''),
    audio_url: new FormControl<string>('')
  });
  public currentDate:string  = '';

  constructor(
    private firestore: FirestoreService,
    private storage: AngularFireStorage,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.currentDate = this.formatDate(new Date());
    this.message.date = this.formatDate(new Date());

    // if(this.currentRoute.includes('editar-mensaje'))
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Obtener el nombre del archivo
      // this.selectedFileName = input.files[0].name;
    } else {
      // Si no hay archivo seleccionado
      // this.selectedFileName = '';
    }
  }


  selectImage(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  selectAudio(event: any): void {
    this.selectedAudio = event.target.files[0];
    if (this.selectedAudio) {
      const reader = new FileReader();
      reader.onload = e => this.audioSrc = reader.result;
      reader.readAsDataURL(this.selectedAudio);
    }
  }

  createMessage() {
    if (this.selectedFile && this.selectedAudio) {
      const filePath = `images_message/${this.selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);

      task.snapshotChanges().toPromise().then(() => {
        fileRef.getDownloadURL().toPromise().then(url => {
          this.message.photo_url = url;
          this.message.photo_filename = this.selectedFile?.name || '';
          this.createAudio();
        }).catch(error => console.log('Error getting download URL', error));
      }).catch(error => console.log('Error uploading file', error));
    }
  }

  createAudio() {
    if (this.selectedAudio) {
      const audioPath = `audio_message/${this.selectedAudio.name}`;
      const audioRef = this.storage.ref(audioPath);
      const audioTask = this.storage.upload(audioPath, this.selectedAudio);

      audioTask.snapshotChanges().toPromise().then(() => {
        audioRef.getDownloadURL().toPromise().then(url => {
          this.message.audio_url = url;
          this.message.audio_filename = this.selectedAudio?.name || '';
          this.createMessageF();
        }).catch(error => console.log('Error getting audio download URL', error));
      }).catch(error => console.log('Error uploading audio', error));
    }
  }

  createMessageF() {
    const path = 'message';
    const id = this.firestore.createId();
    this.message.id = id;

    this.firestore.createDoc(this.message, path, id).then(res => {
      console.log('respuesta ->', res);
    }).catch(error => console.log('Error creating document', error));
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return new Intl.DateTimeFormat('es-ES', options).format(date);
  }
}
