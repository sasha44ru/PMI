import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Contacts} from '../shared/interfaces';
import {ContactsService} from '../shared/contacts.service';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit, OnDestroy {

  contacts: Contacts;
  cSub: Subscription;

  constructor(
    private contactsService: ContactsService
  ) {
  }

  ngOnInit(): void {
    this.cSub = this.contactsService.getInfo().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }

}
