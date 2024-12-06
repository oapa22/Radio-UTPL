import { Component, Input, OnInit } from '@angular/core';
import { BrowserRoute } from '../../interfaces/browser-route';
import { FirestoreService } from '../../services/firebase.service';
import { AuthServiceService } from '../../../auth/services/auth.service';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'radio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Cambiado styleUrl a styleUrls
})
export class HeaderComponent implements OnInit {
  docId!: string;
  logged = false;
  user: User | null = null; // Cambiar a null inicialmente para evitar errores
  item: any;

  @Input() public currentRoute: string = '';
  @Input() public browserRoutes: BrowserRoute[] = [];

  constructor(
    private firestore: FirestoreService,
    private auth: AuthServiceService,
  ) {}

  ngOnInit(): void {
    this.auth.stateUser().subscribe((res) => {
      if (res) {
        this.docId = res.uid;
        this.logged = true;
        console.log(`${res.uid} está logueado`);
        this.getUser(res.uid);
      } else {
        console.log('No está logueado');
      }
    });
    console.log(this.browserRoutes)
  }

  getUser(uid: string): void {
    const path = 'user';
    this.firestore.getDocProject<User>(path, uid).subscribe((res) => {
      if (res) {
        this.user = res;
        console.log(`Usuario cargado: ${this.user.email}`);
      }
    });
  }

  logout(): void {
    this.auth.logout();
    window.location.reload();
  }
}
