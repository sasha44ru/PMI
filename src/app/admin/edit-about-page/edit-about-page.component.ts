import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {About, Applicants} from '../../shared/interfaces';
import {ActivatedRoute} from '@angular/router';
import {AboutService} from '../../shared/about.service';
import {MaterialService} from '../../shared/classes/material.service';

@Component({
  selector: 'app-edit-about-page',
  templateUrl: './edit-about-page.component.html',
  styleUrls: ['./edit-about-page.component.scss']
})
export class EditAboutPageComponent implements OnInit, AfterViewChecked {

  form: FormGroup;
  loading = false;
  submitted = false;
  about: About;
  uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private aboutService: AboutService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.uSub = this.aboutService.getInfo().subscribe((about:About) => {
      this.about = about;
      this.form = new FormGroup({
        text: new FormControl(about.text, Validators.required),
        descriptionForMain: new FormControl(about.descriptionForMain, Validators.required)
      });
      this.loading = false;
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    this.uSub = this.aboutService.update({
      text: this.form.value.text,
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
