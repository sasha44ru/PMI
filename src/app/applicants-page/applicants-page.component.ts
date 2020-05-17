import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Applicants} from '../shared/interfaces';
import {ApplicantsService} from '../shared/applicants.service';

@Component({
  selector: 'app-applicants-page',
  templateUrl: './applicants-page.component.html',
  styleUrls: ['./applicants-page.component.scss']
})
export class ApplicantsPageComponent implements OnInit {

  applicants$: Observable<Applicants>

  constructor(
    private applicantsService: ApplicantsService
  ) { }

  ngOnInit(): void {
    this.applicants$ = this.applicantsService.getInfo();
  }

}
