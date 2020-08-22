import { ErrorInterceptor } from './infra/error.interceptor';
import { JwtInterceptor } from './infra/jwt.interceptor';
import { Constants } from './infra/constants';
import { AuthGuard } from './infra/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { AlunoNewComponent } from './aluno-new/aluno-new.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlunosListComponent } from './alunos-list/alunos-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaisNewComponent } from './pais-new/pais-new.component';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserListComponent } from './user-list/user-list.component';
import { AulaListComponent } from './aula-list/aula-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const appRoutes: Routes = [
  {
    path: Constants.ALUNOS_LIST,
    component: AlunosListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: Constants.ALUNO_NEW,
    component: AlunoNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: Constants.PAIS_NEW,
    component: PaisNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: Constants.USER_NEW,
    component: UserNewComponent,
  },
  {
    path: Constants.USER_EDIT,
    component: UserEditComponent,
  },
  {
    path: Constants.USER_LIST,
    component: UserListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: Constants.AULAS_LIST,
    component: AulaListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AlunosListComponent,
    AlunoNewComponent,
    PaisNewComponent,
    AlertComponent,
    LoginComponent,
    UserNewComponent,
    UserListComponent,
    AulaListComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    // RouterModule.forRoot(appRoutes, { enableTracing: true }),
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
