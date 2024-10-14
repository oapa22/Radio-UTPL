import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AccountRecoveryPageComponent } from './pages/account-recovery-page/account-recovery-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'inicio-sesion', component: LoginPageComponent},
      {path: 'registro', component: RegisterPageComponent},
      {path: 'recuperacion', component: AccountRecoveryPageComponent},
      {path: '**', redirectTo: 'inicio-sesion'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
