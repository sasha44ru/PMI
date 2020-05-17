import {Pipe, PipeTransform} from '@angular/core';
import {News} from '../interfaces';

@Pipe({
  name: 'searchNews'
})
export class searchNewsPipe implements PipeTransform {
  transform(news: News[], search = ''): News[] {
    if (!search.trim()) {
      return news;
    }

    return news.filter(newsItem => {
      if (newsItem.shortDescription) {
        return newsItem.title.toLowerCase().includes(search.toLowerCase()) || newsItem.shortDescription.toLowerCase().includes(search.toLowerCase());
      } else {
        return newsItem.title.toLowerCase().includes(search.toLowerCase());
      }
    });
  }

}
