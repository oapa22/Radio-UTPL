import { Injectable } from "@angular/core";
import { GoogleAuthProvider, OAuthProvider } from "@angular/fire/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat';

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

    rememberMe(){
        return this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    }

    noRememberMe(){
        return this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    }

    recoverPassword(email: string){
        return this.auth.sendPasswordResetEmail(email);
    }

    loginGoogle(){
      return this.auth.signInWithPopup(new GoogleAuthProvider());
    }

    loginMicrosoft() {
        const microsoftProvider = new OAuthProvider('microsoft.com');
        microsoftProvider.setCustomParameters({
          tenant: '6eeb49aa-436d-43e6-becd-bbdf79e5077d'
        });
        microsoftProvider.addScope('user.read');
        microsoftProvider.addScope('openid');
        microsoftProvider.addScope('profile');
        microsoftProvider.addScope('mail.send');
        return this.auth.signInWithPopup(microsoftProvider);
    }

    logout() {
        this.auth.signOut();
    }

    stateUser() {
        return this.auth.authState;
    }

}




