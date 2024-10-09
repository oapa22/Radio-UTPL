import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { NewPodcastComponent } from './pages/new-podcast/new-podcast.component';
import { NewMessageComponent } from './pages/new-message/new-message.component';
import { ListMessageComponent } from './pages/list-message/list-message.component';
import { ListProjectComponent } from './pages/list-project/list-project.component';
import { ListPodcastComponent } from './pages/list-podcast/list-podcast.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    NewProjectComponent,
    NewPodcastComponent,
    NewMessageComponent,
    ListMessageComponent,
    ListProjectComponent,
    ListPodcastComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    EditorModule
  ]
})
export class AdminModule { }
