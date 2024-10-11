import { Component, Input, OnInit } from '@angular/core';
import { BrowserRoute } from '../../interfaces/browser-route';
import { FirestoreService } from '../../services/firebase.service';
import { AuthServiceService } from '../../../auth/services/auth.service';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'radio-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  docId!: string;
  logged = false;
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
    private firestore:FirestoreService,
    private auth: AuthServiceService,
  ){}

  ngOnInit(): void {
    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.docId = res.uid;
        this.logged = true;
        console.log(res.uid,'esta logueado')
        this.getUser()
      } else {
        console.log('no esta loguead')
      }
    });
  }

  getUser(){
    const path = 'user'
    console.log(this.docId,'docid')
    this.firestore.getDocProject<User>(path, this.docId).subscribe( res => {
      this.user = {
        uid: res!.uid,
        id: res!.id,
        names: res!.names,
        email: res!.email,
        password: '', 
        isAdmin: res!.isAdmin,
      };
      console.log(this.user.email)
    });
  }

  logout(){
    this.auth.logout();
    window.location.reload();
  }

  @Input()
  public currentRoute:string = '';

  @Input() public browserRoutes:BrowserRoute[] = [];

}
