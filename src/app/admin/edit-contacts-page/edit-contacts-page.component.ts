import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {About, Contacts} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ContactsService} from '../../shared/contacts.service';
import {MaterialService} from '../../shared/classes/material.service';

@Component({
  selector: 'app-edit-contacts-page',
  templateUrl: './edit-contacts-page.component.html',
  styleUrls: ['./edit-contacts-page.component.scss']
})
export class EditContactsPageComponent implements OnInit, AfterViewChecked {

  form: FormGroup;
  loading = false;
  submitted = false;
  contacts: Contacts;
  uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.uSub = this.contactsService.getInfo().subscribe((contacts: Contacts) => {
      this.contacts = contacts;
      this.form = new FormGroup({
        contactPerson: new FormControl(contacts.contactPerson),
        addInfo: new FormControl(contacts.addInfo),
        onePhone: new FormControl(contacts.onePhone),
        twoPhone: new FormControl(contacts.twoPhone),
        oneEmail: new FormControl(contacts.oneEmail),
        twoEmail: new FormControl(contacts.twoEmail)
      });
      this.loading = false;
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    this.uSub = this.contactsService.update({
      contactPerson: this.form.value.contactPerson,
      addInfo: this.form.value.addInfo,
      onePhone: this.form.value.onePhone,
      twoPhone: this.form.value.twoPhone,
      oneEmail: this.form.value.oneEmail,
      twoEmail: this.form.value.twoEmail,
    }).subscribe(() => {
      MaterialService.toast('Данные были успешно обновлены', 'green darken-2');
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
