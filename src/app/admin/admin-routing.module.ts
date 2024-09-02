import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { NewPodcastComponent } from './pages/new-podcast/new-podcast.component';
import { NewMessageComponent } from './pages/new-message/new-message.component';
import { ListProjectComponent } from './pages/list-project/list-project.component';
import { ListPodcastComponent } from './pages/list-podcast/list-podcast.component';
import { ListMessageComponent } from './pages/list-message/list-message.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'list-project', component: ListProjectComponent},
      {path: 'list-podcast', component: ListPodcastComponent},
      {path: 'list-message', component: ListMessageComponent},
      {path: 'new-project', component: NewProjectComponent},
      {path: 'new-podcast', component: NewPodcastComponent},
      {path: 'new-message', component: NewMessageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
