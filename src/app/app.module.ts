import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA , LOCALE_ID } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, DialogEditNewsletterName, DialogEditNewsletter } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewslettersTableComponent } from './newsletters-table/newsletters-table.component';

import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ExcludeMailPipe } from './pipe/exclude-mail.pipe';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    NewslettersTableComponent,
    DialogEditNewsletterName,
    DialogEditNewsletter,
    ExcludeMailPipe
  ],
  entryComponents: [
    DialogEditNewsletterName,
    DialogEditNewsletter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "fr" }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
