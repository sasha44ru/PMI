import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {EmployeesService} from '../../shared/employees.service';
import {switchMap} from 'rxjs/operators';
import {Employees, News} from '../../shared/interfaces';
import {MaterialService} from '../../shared/classes/material.service';

@Component({
  selector: 'app-edit-employees-page',
  templateUrl: './edit-employees-page.component.html',
  styleUrls: ['./edit-employees-page.component.scss']
})
export class EditEmployeesPageComponent implements OnInit, OnDestroy, AfterViewChecked {

  form: FormGroup;
  loading = false;
  submitted = false;
  employees: Employees;
  uSub: Subscription;
  image: File;
  imagePreview: string | ArrayBuffer;

  constructor(private route: ActivatedRoute, private  employeesService: EmployeesService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.employeesService.getById(params['id']);
        })
      ).subscribe((employees: Employees) => {
      this.employees = employees;
      this.form = new FormGroup({
        lastName: new FormControl(employees.lastName, Validators.required),
        firsName: new FormControl(employees.firsName, Validators.required),
        patronymic: new FormControl(employees.patronymic, Validators.required),
        telephone: new FormControl(employees.telephone),
        eMail: new FormControl(employees.eMail),
        position: new FormControl(employees.position),
        photoFile: new FormControl(null),
        photoFilePath: new FormControl(null),
        shortDescriptionOne: new FormControl(employees.shortDescriptionOne),
        shortDescriptionTwo: new FormControl(employees.shortDescriptionTwo),
        text: new FormControl(employees.text)
      });
      this.loading = false;
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    this.uSub = this.employeesService.update({
      ...this.employees,
      lastName: this.form.value.lastName,
      firsName: this.form.value.firsName,
      patronymic: this.form.value.patronymic,
      telephone: this.form.value.telephone,
      eMail: this.form.value.eMail,
      position: this.form.value.position,
      photoFile: this.form.value.photoFile,
      photoFilePath: this.form.value.photoFilePath,
      shortDescriptionOne: this.form.value.shortDescriptionOne,
      shortDescriptionTwo: this.form.value.shortDescriptionTwo,
      text: this.form.value.text,
      imagePreview: this.imagePreview
    }).subscribe(() => {
      MaterialService.toast('Данные были успешно обновлены', 'green darken-2');
      this.submitted = false;
    });
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    console.log(reader.result);
  }

  ngAfterViewChecked(): void {
    MaterialService.updateTextInputs();
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

}
