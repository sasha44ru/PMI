import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {About, Applicants, News} from '../shared/interfaces';
import {NewsService} from '../shared/news.service';
import {MaterialService} from '../shared/classes/material.service';
import {ApplicantsService} from '../shared/applicants.service';
import {AboutService} from '../shared/about.service';

declare var M;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('carousel') carouselRef: ElementRef;

  @ViewChildren('carouselItem') carouselItem: QueryList<any>;

  news: News[] = [];
  applicants$: Observable<Applicants>;
  about$: Observable<About>;
  nSub: Subscription;

  constructor(
    private newsService: NewsService,
    private applicantsService: ApplicantsService,
    private aboutService: AboutService
  ) {
  }

  ngOnInit(): void {
    this.nSub = this.newsService.getAll().subscribe(news => {
      if (news.length > 10) {
        this.news = news.splice(0, 10);
      } else {
        this.news = news;
      }
    });
    this.applicants$ = this.applicantsService.getInfo();
    this.about$ = this.aboutService.getInfo();
  }

  ngOnDestroy(): void {
    if (this.nSub) {
      this.nSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.carouselItem.changes.subscribe(t => {
      this.ngForRendred();
    });
  }

  ngForRendred() {
    MaterialService.carouselInit(this.carouselRef);
  }
}
