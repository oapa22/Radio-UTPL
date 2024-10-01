import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";

import { BehaviorSubject, finalize, map, Observable, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class FirestoreService {
   public downloadUrl$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(private firestore: AngularFirestore, private storage: AngularFireStorage,) {
    }

    //crear el id que se usara en los documentos
    createId(){
        return this.firestore.createId();
    }

    //obtener cualquier coleccion de firebase
    getCollection<tipo>(path: string){
        const collection = this.firestore.collection<tipo>(path);
        return collection.valueChanges();
    }

    //crear un documento
    createDoc(data: any, path: string, id: string){
        const collection = this.firestore.collection(path);
        return collection.doc(id).set(data);
    }

    //obtener documento que se encuentra dentro de cualquier coleccion
    getDoc<tipo>(path: string, id: string){
        return this.firestore.collection(path).doc<tipo>(id).valueChanges().subscribe( (res) => {
            res
        });
    }



    // ======================================================================================================
    //obtener documento de un proyecto que se encuentra dentro de cualquier coleccion
    public getDocPodcast<tipo>(path:string, id:string){
      return this.firestore.collection(path).doc<tipo>(id).valueChanges();
    }
    public getDocProject<tipo>(path: string, id: string){
      return this.firestore.collection(path).doc<tipo>(id).valueChanges();
    }
    public getDocMessage<tipo>(path:string, id:string){
      return this.firestore.collection(path).doc<tipo>(id).valueChanges();
    }

    public getLatestDocPodcast<tipo>(path: string) {
      // const q = query(this.firestore, orderBy("name", "desc"), limit(3));

      return this.firestore.collection<tipo>(path, ref => ref.orderBy('createdAt', 'desc').limit(3)).valueChanges();
    }

    // Funcion para subir la imagen a firebase y obtener la url.
    public getImageURLFirebase(fileSelec:File,fileName:string):Observable<string> {

      // Obtener el archivo seleccionado
      const filePath = `images_project/${fileName}`;  // Definir la ruta donde se almacenará la imagen
      const fileRef = this.storage.ref(filePath);  // Crear una referencia al archivo
      const uploadTask = this.storage.upload(filePath,fileSelec);  // Subir el archivo a Firebase Storage

      // Escuchar el proceso de carga
      return uploadTask.snapshotChanges().pipe(
        finalize(() =>  {}),
        switchMap(() => fileRef.getDownloadURL())
      );

      // let stringsg:string = '';
      // const filePath = `images_project/${fileName}`;

      // const ref = this.storage.ref('images_project/patio-alquile - frame at 0m7s.jpg');

      // return  ref.getDownloadURL().subscribe(url =>);
    }

    public uploadFile(fileSelec:File,fileName:string):Observable<number | undefined> {

      const filePath = `images_project/${fileName}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, fileSelec);

      uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().pipe(map(res =>{
              this.downloadUrl$.next(res);
            })).subscribe();
          })
       )
      .subscribe();
      return uploadTask.percentageChanges();
    }
    // ======================================================================================================


    //actualizar documento
    updateDoc(path: string, id: string, data: any) {
        return this.firestore.collection(path).doc(id).update(data)
    }

    //eliminar documento
    deleteDoc(path: string, id: string) {
        return this.firestore.collection(path).doc(id).delete();
    }
}
