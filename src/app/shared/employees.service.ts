import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employees, FbCreateResponse} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class EmployeesService {
  constructor(
    private http: HttpClient
  ) {

  }

  create(employees: Employees): Observable<Employees> {
    return this.http.post(`${environment.fbDBUrl}/employees.json`, employees)
      .pipe(
        map((response: FbCreateResponse) => {
          return {
            ...employees,
            id: response.name
          };
        })
      );
  }

  getAll(): Observable<Employees[]> {
    return this.http.get(`${environment.fbDBUrl}/employees.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object.keys(response).map(key => ({
            ...response[key],
            id: key
          })).reverse();
        })
      );
  }

  getById(id: string): Observable<Employees> {
    return this.http.get<Employees>(`${environment.fbDBUrl}/employees/${id}.json`)
      .pipe(
        map((employees: Employees) => {
          return {
            ...employees,
            id: id
          };
        })
      );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDBUrl}/employees/${id}.json`);
  }

  update(employees: Employees): Observable<Employees>{
    return this.http.patch<Employees>(`${environment.fbDBUrl}/employees/${employees.id}.json`, employees);
  }
}
