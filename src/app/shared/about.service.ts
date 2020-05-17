import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {About} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class AboutService {
  constructor(
    private http: HttpClient
  ) {

  }

  getInfo(): Observable<About> {
    return this.http.get(`${environment.fbDBUrl}/about.json`)
      .pipe(
        map((about: About) => {
          return about;
        })
      );
  }

  update(about: About): Observable<About> {
    return this.http.patch<About>(`${environment.fbDBUrl}/about.json`, about);
  }
}
