import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {NewsService} from '../shared/news.service';
import {Observable} from 'rxjs';
import {News} from '../shared/interfaces';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-news-view-page',
  templateUrl: './news-view-page.component.html',
  styleUrls: ['./news-view-page.component.scss']
})
export class NewsViewPageComponent implements OnInit {

  news$: Observable<News>;

  constructor(
    private router: ActivatedRoute,
    private newsService: NewsService
  ) {
  }

  ngOnInit(): void {
    this.news$ = this.router.params
      .pipe(switchMap((params: Params) => {
        return this.newsService.getById(params['id']);
      }));
  }

}
