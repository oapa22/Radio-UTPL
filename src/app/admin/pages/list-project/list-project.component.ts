import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../../radio/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Project } from './../../../shared/interfaces/project.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {

  project: Project | null = null;
  safeContent: SafeHtml | null = null;

  constructor(
    private firestore: FirestoreService,
    private storage: AngularFireStorage,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject(){
    this.firestore.getCollection<Project>('project').subscribe(res => {
      console.log('Todos los proyectos:', res);

      this.project = res.find(p => p.title === 'asdasd') || null;
      console.log('Proyecto con título "Tiny":', this.project);

      if (this.project) {
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.project.content || '');
      }
    });
  }
}
