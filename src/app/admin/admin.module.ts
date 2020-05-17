import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {CreateNewPageComponent} from './create-new-page/create-new-page.component';
import {EditNewPageComponent} from './edit-new-page/edit-new-page.component';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './shared/services/auth.guard';
import { ApplicantsPageComponent } from './applicants-page/applicants-page.component';
import { EditAboutPageComponent } from './edit-about-page/edit-about-page.component';
import { EditContactsPageComponent } from './edit-contacts-page/edit-contacts-page.component';
import { EditEmployeesPageComponent } from './edit-employees-page/edit-employees-page.component';
import { CreateEmployeesPageComponent } from './create-employees-page/create-employees-page.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreateNewPageComponent,
    EditNewPageComponent,
    ApplicantsPageComponent,
    EditAboutPageComponent,
    EditContactsPageComponent,
    EditEmployeesPageComponent,
    CreateEmployeesPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate:[AuthGuard]},
          {path: 'create-news', component: CreateNewPageComponent, canActivate:[AuthGuard]},
          {path: 'edit-news/:id', component: EditNewPageComponent, canActivate:[AuthGuard]},
          {path: 'edit-about', component: EditAboutPageComponent, canActivate:[AuthGuard]},
          {path: 'edit-applicants', component: ApplicantsPageComponent, canActivate:[AuthGuard]},
          {path: 'create-employees', component: CreateEmployeesPageComponent, canActivate:[AuthGuard]},
          {path: 'edit-employees/:id', component: EditEmployeesPageComponent, canActivate:[AuthGuard]},
          {path: 'edit-contacts', component: EditContactsPageComponent, canActivate:[AuthGuard]},
        ]
      }
    ]),
    FormsModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AdminModule {

}
