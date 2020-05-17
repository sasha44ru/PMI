import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FbCreateResponse, News} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class NewsService {
  constructor(
    private http: HttpClient
  ) {

  }

  create(news: News): Observable<News> {
    return this.http.post(`${environment.fbDBUrl}/news.json`, news)
      .pipe(
        map((response: FbCreateResponse) => {
          return {
            ...news,
            id: response.name,
            date: new Date(news.date)
          };
        })
      );
  }

  getAll(): Observable<News[]> {
    return this.http.get(`${environment.fbDBUrl}/news.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object.keys(response).map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          })).reverse();
        })
      );
  }

  getById(id: string): Observable<News> {
    return this.http.get<News>(`${environment.fbDBUrl}/news/${id}.json`)
      .pipe(
        map((news: News) => {
          return {
            ...news,
            id: id,
            date: new Date(news.date)
          };
        })
      );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDBUrl}/news/${id}.json`);
  }

  update(news: News): Observable<News>{
    return this.http.patch<News>(`${environment.fbDBUrl}/news/${news.id}.json`, news);
  }
}
