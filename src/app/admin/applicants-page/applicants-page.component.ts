import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Applicants, News} from '../../shared/interfaces';
import {ActivatedRoute, Params} from '@angular/router';
import {ApplicantsService} from '../../shared/applicants.service';
import {switchMap} from 'rxjs/operators';
import {MaterialService} from '../../shared/classes/material.service';

@Component({
  selector: 'app-applicants-page',
  templateUrl: './applicants-page.component.html',
  styleUrls: ['./applicants-page.component.scss']
})
export class ApplicantsPageComponent implements OnInit, OnDestroy, AfterViewChecked {

  form: FormGroup;
  loading = false;
  submitted = false;
  applicants: Applicants;
  uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private applicantsService: ApplicantsService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.uSub = this.applicantsService.getInfo().subscribe((applicants:Applicants) => {
      this.applicants = applicants;
      this.form = new FormGroup({
        undergraduateInfo: new FormControl(applicants.undergraduateInfo, Validators.required),
        magistracyInfo: new FormControl(applicants.magistracyInfo, Validators.required),
        descriptionForMain: new FormControl(applicants.descriptionForMain, Validators.required)
      });
      this.loading = false;
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    this.uSub = this.applicantsService.update({
      undergraduateInfo: this.form.value.undergraduateInfo,
      magistracyInfo: this.form.value.magistracyInfo,
      descriptionForMain: this.form.value.descriptionForMain
    }).subscribe(() => {
      MaterialService.toast('Данные были успешно обновлены','green darken-2')
      this.submitted = false;
    });
  }

  ngAfterViewChecked(): void {
    MaterialService.updateTextInputs();
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

}
