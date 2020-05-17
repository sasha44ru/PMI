import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeesService} from '../../shared/employees.service';
import {Employees} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-employees-page',
  templateUrl: './create-employees-page.component.html',
  styleUrls: ['./create-employees-page.component.scss']
})
export class CreateEmployeesPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  image: File;
  submitted = false;
  cSub: Subscription;
  imagePreview: string | ArrayBuffer;

  constructor(private employeesService: EmployeesService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      lastName: new FormControl(null, Validators.required),
      firsName: new FormControl(null, Validators.required),
      patronymic: new FormControl(null, Validators.required),
      telephone: new FormControl(null),
      eMail: new FormControl(null),
      position: new FormControl(null),
      photoFile: new FormControl(null),
      photoFilePath: new FormControl(null),
      shortDescriptionOne: new FormControl(null),
      shortDescriptionTwo: new FormControl(null),
      text: new FormControl(null)
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const employees: Employees = {
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
    };

    this.cSub = this.employeesService.create(employees).subscribe(() => {
      this.form.reset();
    });
  }

  ngOnDestroy() {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
  }
}
