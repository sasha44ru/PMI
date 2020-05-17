import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsService} from '../../shared/news.service';
import {Employees, News} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {EmployeesService} from '../../shared/employees.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  news: News[] = [];
  employees: Employees[] = []
  nSubNews: Subscription;
  dSubNews: Subscription;
  nSubEmployees: Subscription;
  dSubEmployees: Subscription;
  searchNews = '';
  loadingNews = false;
  loadingEmployees = false;

  constructor(
    private newsService: NewsService,
    private employeesService: EmployeesService
  ) {
  }

  ngOnInit(): void {
    this.loadingNews = true;
    this.nSubNews = this.newsService.getAll().subscribe(news => {
      this.news = news;
      this.loadingNews = false;
    });

    this.loadingEmployees = true;
    this.nSubEmployees = this.employeesService.getAll().subscribe(employees => {
      this.employees = employees;
      this.loadingEmployees = false;
    });
  }

  ngOnDestroy() {
    if (this.nSubNews) {
      this.nSubNews.unsubscribe();
    }
    if (this.dSubNews) {
      this.dSubNews.unsubscribe();
    }

    if (this.nSubEmployees) {
      this.nSubEmployees.unsubscribe();
    }
    if (this.dSubEmployees) {
      this.dSubEmployees.unsubscribe();
    }
  }

  removeNews(id: string) {
    this.dSubNews = this.newsService.remove(id).subscribe(() => {
      this.news = this.news.filter(news => news.id !== id);
    });
  }

  removeEmployees(id: string) {
    this.dSubEmployees = this.employeesService.remove(id).subscribe(() => {
      this.employees = this.employees.filter(employees => employees.id !== id);
    });
  }
}
