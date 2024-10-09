import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
<<<<<<< HEAD
import { RegisterPageComponent } from './pages/register-page/register-page.component';
=======
>>>>>>> ab310dcbb31030ecffc0565889dbc03c11e5518c

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD
    component: LayoutPageComponent,
    children: [
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
    ]
=======
    component: LoginPageComponent
>>>>>>> ab310dcbb31030ecffc0565889dbc03c11e5518c
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
