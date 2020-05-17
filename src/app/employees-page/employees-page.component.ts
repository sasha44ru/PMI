import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Employees} from '../shared/interfaces';
import {EmployeesService} from '../shared/employees.service';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss']
})
export class EmployeesPageComponent implements OnInit {

  employees$: Observable<Employees[]>

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.employees$ = this.employeesService.getAll();
  }

}
