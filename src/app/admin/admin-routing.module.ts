import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { NewPodcastComponent } from './pages/new-podcast/new-podcast.component';
import { NewMessageComponent } from './pages/new-message/new-message.component';
import { ListTemplateComponent } from './pages/list-template/list-template.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'lista/:collection', component: ListTemplateComponent},
      {path: 'nuevo-proyecto', component: NewProjectComponent},
      {path: 'editar-proyecto/:id', component: NewProjectComponent},
      {path: 'nuevo-podcast', component: NewPodcastComponent},
      {path: 'editar-podcast/:id', component: NewPodcastComponent},
      {path: 'nuevo-mensaje', component: NewMessageComponent},
      {path: 'editar-mensaje/:id', component: NewMessageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
