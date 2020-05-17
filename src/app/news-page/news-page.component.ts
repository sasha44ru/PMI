import { Component, OnInit } from '@angular/core';
import {NewsService} from '../shared/news.service';
import {Observable} from 'rxjs';
import {News} from '../shared/interfaces';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  news$: Observable<News[]>
  searchNews = '';

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.news$ = this.newsService.getAll()
  }

}
