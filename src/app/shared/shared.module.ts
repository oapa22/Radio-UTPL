import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error-404-page/error-404-page.component';
import { CardPodcastComponent } from './components/card-podcast/card-podcast.component';
import { CardProjectsComponent } from './components/card-project/card-projects.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [
    Error404PageComponent,
    CardPodcastComponent,
    CardProjectsComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    Error404PageComponent,
    CardPodcastComponent,
    CardProjectsComponent
  ]
})
export class SharedModule { }
