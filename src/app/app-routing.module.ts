import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AboutPageComponent} from './about-page/about-page.component';
import {ApplicantsPageComponent} from './applicants-page/applicants-page.component';
import {ContactsPageComponent} from './contacts-page/contacts-page.component';
import {EmployeesPageComponent} from './employees-page/employees-page.component';
import {NewsPageComponent} from './news-page/news-page.component';
import {NewsViewPageComponent} from './news-view-page/news-view-page.component';
import {EmployeesViewPageComponent} from './employees-view-page/employees-view-page.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
      { path: 'about', component: AboutPageComponent},
      { path: 'applicants', component: ApplicantsPageComponent},
      { path: 'contacts', component: ContactsPageComponent},
      { path: 'employees', component: EmployeesPageComponent},
      { path: 'employees/:id', component: EmployeesViewPageComponent},
      { path: 'news', component: NewsPageComponent},
      { path: 'news/:id', component: NewsViewPageComponent}
    ]
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
