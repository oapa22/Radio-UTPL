import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../../radio/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Message } from './../../../shared/interfaces/message.interface';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'admin-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit{
  imageSrc: string | ArrayBuffer | null = null;
  audioSrc: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  selectedAudio: File | null = null;

  date = '';
  message: Message = {
    id: '',
    name: '',
    date: Timestamp.now(),
    photo_url: '',
    photo_filename: '',
    audio_filename: '',
    audio_url: '',
  }

  public messageForm = new FormGroup({
    name: new FormControl<string>('')
  });

  public fileImageSelec!:File;
  public fileAudioSelec!:File;
  public fileImageName:string= 'Ninguna imagen seleccionada';
  public fileAudioName:string= 'Ningun audio seleccionado';
  public currentDate:string  = '';
  public currentRoute:string = '';

  constructor(
    private firestore: FirestoreService,
    private activatedRoute:ActivatedRoute,
    private storage: AngularFireStorage,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.formatDate();
    this.currentRoute = this.router.url;
    if(this.router.url.includes('editar-mensaje')){
      this.activatedRoute.params.pipe(
        switchMap(({id}) => this.firestore.getDocMessage<Message>('message',id))
      ).subscribe(message => {
          if (!message) return this.router.navigateByUrl('/');
          this.messageForm.reset(message);
          this.fileImageName = message.photo_filename;
          this.fileAudioName = message.audio_filename;
          return;
      });
    }

    // if(this.currentRoute.includes('editar-mensaje'))
  }

  public onFileSelected(event: Event, file:'image'|'audio'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Obtener el nombre del archivo

      if (file == 'image'){
        this.fileImageSelec = input.files[0];
        this.fileImageName = input.files[0].name;
      } else {
        this.fileAudioSelec = input.files[0];
        this.fileAudioName = input.files[0].name;
      }

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
    this.message.date = Timestamp.now();

    this.firestore.createDoc(this.message, path, id).then(res => {
      console.log('respuesta ->', res);
    }).catch(error => console.log('Error creating document', error));
  }

  formatDate() {
    const date = this.message.date.toDate();
  
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
