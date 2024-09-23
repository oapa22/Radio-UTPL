import { AuthServiceService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../../radio/services/firebase.service';
import { User } from '../../../shared/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  users: User[] = [];
  user: User = {
    uid: '',
    id: '',
    names: '',
    email: '',
    password: '',
    isAdmin: false,
  }

  constructor(
    private firestore: FirestoreService,
    private auth: AuthServiceService,
    private router: Router){
  }
  
  ngOnInit(): void {
    this.getUsers();
  }

  async login() {
    const datos = {
      email: this.user.email,
      password: this.user.password,
    }
    const res = await this.auth.login(datos)
    if (res){
      console.log('res ->', res)
      this.router.navigate(['radio-utpl/inicio'])
    }
  }

  loginGoogle() {
    this.auth.loginGoogle().then(async (res: any) => {
      if (res?.user) {
        const uid = res.user.uid;
        const email = res.user.email;
  
        try {
          console.log(this.users)
          const userDoc = this.users.find(user => user.uid === uid);
          console.log('uid some',userDoc)
          console.log('uid impreso',uid)

          if (!userDoc) {  
            const newUser: User = {
              uid: uid,
              id: uid,
              names: res.user.displayName || '',
              email: email,
              password: '', 
              isAdmin: false,
            };
  
            await this.firestore.createDoc(newUser, 'user', uid);
            console.log('Usuario creado', newUser);
          } else {
            console.log('Usuario ya registrado', userDoc);
          }
  
          this.router.navigate(['radio-utpl/inicio']);
        } catch (error) {
          console.error('Error al verificar o crear el usuario', error);
        }
      }
    }).catch(error => {
      console.error('Error al iniciar sesión con Google:', error);
    });
  }
  
  getUsers(){
    this.firestore.getCollection<User>('user').subscribe( res => {
      this.users = res;
    });
  }
  
  

}

