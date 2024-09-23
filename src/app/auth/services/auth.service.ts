import { Injectable } from "@angular/core";
import { GoogleAuthProvider } from "@angular/fire/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})

export class AuthServiceService {

    constructor(private auth: AngularFireAuth,
        private firestore: AngularFirestore,) {}

    register({email, password}: any) {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    login({email, password}:any){
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    loginGoogle(){
      return this.auth.signInWithPopup(new GoogleAuthProvider());
    }

    logout() {
        this.auth.signOut();
    }

    stateUser() {
        return this.auth.authState;
    }

}




