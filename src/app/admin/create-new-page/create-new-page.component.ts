import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {News} from '../../shared/interfaces';
import {NewsService} from '../../shared/news.service';
import {MaterialService} from '../../shared/classes/material.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-create-new-page',
  templateUrl: './create-new-page.component.html',
  styleUrls: ['./create-new-page.component.scss']
})
export class CreateNewPageComponent implements OnInit, OnDestroy {

  @ViewChild('titleNews') titleNewsRef: ElementRef;

  form: FormGroup;
  submitted = false;
  cSub: Subscription;

  constructor(
    private newsService: NewsService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      shortDescription: new FormControl(null)
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const news: News = {
      title: this.form.value.title,
      text: this.form.value.text,
      shortDescription: this.form.value.shortDescription,
      date: new Date()
    };

    this.cSub = this.newsService.create(news).subscribe(() => {
      this.form.reset();
      this.titleNewsRef.nativeElement.classList.remove('valid');
    });
  }

  ngOnDestroy() {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }
}
