import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {About, Contacts} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ContactsService {
  constructor(
    private http: HttpClient
  ) {

  }

  getInfo(): Observable<Contacts> {
    return this.http.get(`${environment.fbDBUrl}/contacts.json`)
      .pipe(
        map((contacts: Contacts) => {
          return contacts;
        })
      );
  }

  update(contacts: Contacts): Observable<Contacts> {
    return this.http.patch<Contacts>(`${environment.fbDBUrl}/contacts.json`, contacts);
  }
}
