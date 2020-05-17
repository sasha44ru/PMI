import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import { LoaderComponent } from './components/loader/loader.component';
import {searchNewsPipe} from './pipes/searchNews.pipe';

@NgModule({
  imports: [
    HttpClientModule,
    QuillModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    LoaderComponent,
    searchNewsPipe
  ],
  declarations: [LoaderComponent,searchNewsPipe]
})
export class SharedModule {

}
