import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Employees} from '../shared/interfaces';
import {EmployeesService} from '../shared/employees.service';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-employees-view-page',
  templateUrl: './employees-view-page.component.html',
  styleUrls: ['./employees-view-page.component.scss']
})
export class EmployeesViewPageComponent implements OnInit {

  employees$: Observable<Employees>

  constructor(
    private router: ActivatedRoute,
    private employeesService: EmployeesService
  ) { }

  ngOnInit(): void {
    this.employees$ = this.router.params
      .pipe(switchMap((params: Params) => {
        return this.employeesService.getById(params['id']);
      }));
  }

}
