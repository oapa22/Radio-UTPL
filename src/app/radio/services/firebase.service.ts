import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})

export class FirestoreService {

    constructor(private firestore: AngularFirestore) { }

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

    //obtener documento de un proyecto que se encuentra dentro de cualquier coleccion
    getDocPodcast<tipo>(path:string, id:string){
      return this.firestore.collection(path).doc<tipo>(id).valueChanges();
    }
    getDocProject<tipo>(path: string, id: string){
      return this.firestore.collection(path).doc<tipo>(id).valueChanges();
    }
    getDocMessage<tipo>(path:string, id:string){
      return this.firestore.collection(path).doc<tipo>(id).valueChanges();
    }

    //actualizar documento
    updateDoc(path: string, id: string, data: any) {
        return this.firestore.collection(path).doc(id).update(data)
    }

    //eliminar documento
    deleteDoc(path: string, id: string) {
        return this.firestore.collection(path).doc(id).delete();
    }
}
