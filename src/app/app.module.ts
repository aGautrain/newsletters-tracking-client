import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA , LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ExcludeMailPipe } from './pipe/exclude-mail.pipe';
import { OnlyMailPipe } from './pipe/only-mail.pipe';
import { SendingsOverviewComponent } from './sendings-overview/sendings-overview.component';
import {MatToolbarModule} from '@angular/material';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    NewslettersTableComponent,
    DialogEditNewsletterName,
    DialogEditNewsletter,
    ExcludeMailPipe,
    OnlyMailPipe,
    SendingsOverviewComponent
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
    MatTooltipModule,
    MatSidenavModule,
    MatStepperModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
