import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {AboutPageComponent} from '../../../about-page/about-page.component';
import {ApplicantsPageComponent} from '../../../applicants-page/applicants-page.component';
import {ContactsPageComponent} from '../../../contacts-page/contacts-page.component';
import {EmployeesPageComponent} from '../../../employees-page/employees-page.component';
import {NewsPageComponent} from '../../../news-page/news-page.component';
import {NewsViewPageComponent} from '../../../news-view-page/news-view-page.component';
import {MaterialService} from '../../classes/material.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('headerBlock') headerBlockRef: ElementRef;
  @ViewChild('sideNav') sideNavRef: ElementRef;

  activatedRoute = '';
  links = [
    {url: '/about', name: 'О кафедре'},
    {url: '/news', name: 'Новости'},
    {url: '/applicants', name: 'Поступающим'},
    {url: '/employees', name: 'Сотрудники'},
    {url: '/contacts', name: 'Контакты'}
  ];

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.activateRoute(this.router.url);
  }

  @HostListener('window:resize')
  onResize() {
    this.headerSize();
  }

  headerSize() {
    this.headerBlockRef.nativeElement.style.height = `${window.innerHeight}px`;
  }

  activateRoute(activatedRoute: string) {
    this.activatedRoute = activatedRoute;
  }

  ngAfterViewInit() {
    this.headerSize();
    MaterialService.initSideNav(this.sideNavRef);
    this.router.events.subscribe(val => {
      this.activateRoute(this.router.url);
      if (MaterialService.isOpenSideNav(this.sideNavRef)) {
        MaterialService.closeSideNav(this.sideNavRef);
      }
    });
  }

  get headerTitle() {
    if (this.activatedRoute.includes('home')) {
      return 'Кафедра ПМИ';
    } else if (this.activatedRoute.includes('about')) {
      return 'О кафедре';
    } else if (this.activatedRoute.includes('news/')) {
      return 'Категория новости';
    } else if (this.activatedRoute.includes('news')) {
      return 'Новости';
    } else if (this.activatedRoute.includes('applicants')) {
      return 'Поступающим';
    } else if (this.activatedRoute.includes('employees')) {
      return 'Сотрудники';
    } else if (this.activatedRoute.includes('contacts')) {
      return 'Контакты';
    } else {
      return '';
    }
  }

  get headerSubTitle() {
    if (this.activatedRoute.includes('home')) {
      return 'Добро пожаловать на сайт кафедры прикладной математики и информационных технологий Костромсого Государсвенного Университета';
    } else {
      return '';
    }
  }

  onActivate(event) {
    window.scroll(0,0);
    // let scrollToTop = window.setInterval(() => {
    //   let pos = window.pageYOffset;
    //   if (pos > 0) {
    //     window.scrollTo(0, pos - 20);
    //   } else {
    //     window.clearInterval(scrollToTop);
    //   }
    // }, 16);
  }
}
