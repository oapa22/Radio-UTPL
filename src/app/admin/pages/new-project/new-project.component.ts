import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../../radio/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Project } from './../../../shared/interfaces/project.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'admin-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit{
  imageSrc: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  summaryError: boolean = false;

  project: Project = {
    id: '',
    title: '',
    date: '',
    keywords: '',
    summary: '',
    photo_url: '',
    photo_filename: '',
    content: '',
  }

  // Formulario para obtener los valores
  public projectForm = new FormGroup({
    title: new FormControl<string>(''),
    keywords: new FormControl<string>(''),
    summary: new FormControl<string>(''),
    content: new FormControl<string>('')
  });

  public currentDate:string = '';
  public currentRoute:string = '';
  public fileSelec!:File;
  public fileName:string= 'Ninguna imagen seleccionada';

  constructor(
    private firestore: FirestoreService,
    private storage: AngularFireStorage,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    if(this.router.url.includes('editar-proyecto')){
      this.activatedRoute.params.pipe(
        switchMap(({id}) => this.firestore.getDocProject<Project>('project',id))
      ).subscribe(project => {
          if (!project) return this.router.navigateByUrl('/');
          this.projectForm.reset(project);
          this.fileName = project.photo_filename;
          return;
      });
    }
    this.currentDate = this.formatDate(new Date());
  }


  // ==========================================================================
  // Fucion para obtener imagen local del computador.
  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Obtener el nombre del archivo
      this.fileSelec = input.files[0];
      this.fileName = input.files[0].name;
    }
  }

  public createProject():void{
    let downloadUriSub:Subscription;
    let storageUri: string = '';

    downloadUriSub = this.firestore.downloadUrl$.subscribe((res) => {
      console.log('SUBSCRIBED to download url');
      storageUri = res;
    },
    (err)=>{
      console.log('Error in subscription: ' + err);
    });

    console.log("sadasdsad: "+storageUri);

    // this.firestore.getImageURLFirebase(this.fileSelec, this.fileName).subscribe(urlImage => {
    //   this.project.photo_url = urlImage;
    //   console.log("Esta es la url dentro del metodo: " + urlImage);
    // });

    // console.log("Esta es la url fuera del metodo: "+this.project.photo_url);




    // const path = 'project';
    // const id = this.firestore.createId();

    // this.project = this.projectForm.value as Project;
    // this.project.id = id;
    // this.firestore.getImageURLFirebase(this.fileSelec, this.fileName).subscribe(urlImage => this.project.photo_url = urlImage);
    // this.project.photo_filename = this.fileName
    // this.project.date = this.currentDate;
    // this.project.content = '<div> asdasdasdsa </div>';

    // this.firestore.createDoc(this.project, path, id).then(res => {
    //   console.log('respuesta ->', res);
    // }).catch(error => console.log('Error creating document', error));
  }
  // ==========================================================================




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

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return new Intl.DateTimeFormat('es-ES', options).format(date);
  }
}
