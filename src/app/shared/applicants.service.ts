import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Applicants} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ApplicantsService {
  constructor(
    private http: HttpClient
  ) {

  }

  getInfo(): Observable<Applicants> {
    return this.http.get(`${environment.fbDBUrl}/applicants.json`)
      .pipe(
        map((applicants: Applicants) => {
          return applicants;
        })
      );
  }

  update(applicants: Applicants): Observable<Applicants> {
    return this.http.patch<Applicants>(`${environment.fbDBUrl}/applicants.json`, applicants);
  }
}
