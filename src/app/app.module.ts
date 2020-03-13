import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContentCardComponent } from './content-card/content-card.component';
import { SafePipe } from './safe.pipe';
import { ContentListComponent } from './content-list/content-list.component';
import { FilterTypePipe } from './filter-type.pipe';
import {FormsModule} from '@angular/forms';
import { AttributeDirectiveDirective } from './attribute-directive.directive';
import { CreateContentComponent } from './create-content/create-content.component';
import { AppMessagesComponent } from './app-messages/app-messages.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    ContentCardComponent,
    SafePipe,
    ContentListComponent,
    FilterTypePipe,
    AttributeDirectiveDirective,
    CreateContentComponent,
    AppMessagesComponent,
  ],
  imports: [
    BrowserModule,
      FormsModule,
      HttpClientModule,
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService,{dataEncapsulation:false}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
