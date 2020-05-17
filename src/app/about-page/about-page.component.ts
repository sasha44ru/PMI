import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AboutService} from '../shared/about.service';
import {Observable} from 'rxjs';
import {About} from '../shared/interfaces';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  about$: Observable<About>;

  constructor(
    private aboutService: AboutService
  ) {
  }

  ngOnInit(): void {
    this.about$ = this.aboutService.getInfo();

  }

}
