import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {NewsService} from '../../shared/news.service';
import {switchMap} from 'rxjs/operators';
import {News} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MaterialService} from '../../shared/classes/material.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-new-page',
  templateUrl: './edit-new-page.component.html',
  styleUrls: ['./edit-new-page.component.scss']
})
export class EditNewPageComponent implements OnInit, AfterViewChecked, OnDestroy {

  form: FormGroup;
  loading = false;
  submitted = false;
  news: News;
  uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.newsService.getById(params['id']);
        })
      ).subscribe((news: News) => {
      this.news = news;
      this.form = new FormGroup({
        title: new FormControl(news.title, Validators.required),
        text: new FormControl(news.text, Validators.required),
        shortDescription: new FormControl(news.shortDescription)
      });
      this.loading = false;
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    this.uSub = this.newsService.update({
      ...this.news,
      title: this.form.value.title,
      text: this.form.value.text,
      shortDescription: this.form.value.shortDescription
    }).subscribe(() => {
      MaterialService.toast('Данные были успешно обновлены','green darken-2')
      this.submitted = false;
    });
  }

  ngAfterViewChecked(): void {
    MaterialService.updateTextInputs();
  }

  ngOnDestroy(): void {
    if (this.uSub){
      this.uSub.unsubscribe();
    }
  }

}
