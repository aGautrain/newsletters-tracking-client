import { Injectable } from '@angular/core';
import { Newsletter, ScriptExecutionResult, NewsletterStatus } from './newsletter';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewslettersService {

  private apiHost: string = 'http://localhost:1337/';
  private newslettersApiEndpoint: string = 'newsletters/';
  private gmailApiScriptEndpoint: string = 'gmailUpdate/';
  private newslettersSetNameApiEndpoint: string = 'newsletters/setName';
  private newslettersSetApiEndpoint: string = 'newsletters/';

  newsletters: Newsletter[] = [];

  constructor(private http: HttpClient) { }

  getNewslettersFromServer(): Promise<Newsletter[]> {
    return this.http.get<Newsletter[]>(this.apiHost + this.newslettersApiEndpoint)
            .toPromise()
            .then((newsletters) => {

              let dueDate: number, tomorrowDueDate:number, dateForWarning: number, dateForError: number, latestDate: number, now: number;

              now = Date.now();

              newsletters.map((newsletter) => {

                dueDate = this.dateFromMinutes(newsletter.expectedTimeOfArrival).getTime();
                tomorrowDueDate = this.tomorrowDateFromMinutes(newsletter.expectedTimeOfArrival).getTime();
                dateForWarning = this.dateFromMinutes(newsletter.expectedTimeOfArrival + newsletter.toleranceBeforeWarning).getTime();
                dateForError = this.dateFromMinutes(newsletter.expectedTimeOfArrival + newsletter.toleranceBeforeError).getTime();

                // latestDate = new Date(newsletter.lastReceivedByClient).getTime();
                latestDate = new Date(newsletter.lastSentByServer).getTime();

                newsletter.expectedDateTime = dueDate;

                if (this.hasReceivedToday(latestDate) || latestDate > dueDate) {
                  newsletter.arrivedToday = true;
                  newsletter.expectedDateTime = tomorrowDueDate;

                  newsletter.status = NewsletterStatus.ON_TIME;

                  // No distinction between error/warning for arrived newsletters
                  if (latestDate > dateForError) {
                    newsletter.status = NewsletterStatus.LATE;
                  } else if (latestDate > dateForWarning) {
                    newsletter.status = NewsletterStatus.LATE;
                  }

                } else {
                  newsletter.arrivedToday = false;

                  if (now < dueDate) {
                    newsletter.status = NewsletterStatus.SCHEDULED;
                  } else if (now > dateForError) {
                    newsletter.status = NewsletterStatus.NOT_SENT;
                  } else if (now > dateForWarning) {
                    newsletter.status = NewsletterStatus.LATE;
                  } else {
                    newsletter.status = NewsletterStatus.SCHEDULED;
                  }
                }



              });

              this.newsletters = [...newsletters]; // new reference for change detection

              return this.newsletters;
            });
  }

  callGmailApi(): Promise<ScriptExecutionResult> {
    return this.http.get<ScriptExecutionResult>(this.apiHost + this.gmailApiScriptEndpoint)
            .toPromise()
            .then((scriptExecution) => {
              if (scriptExecution && scriptExecution.messagesProcessed) {
                this.getNewslettersFromServer();
              }
              return scriptExecution;
            });
  }

  setNewsletterName(id: string, name: string): Promise<any> {
    return this.http.get<any>(this.apiHost + this.newslettersSetNameApiEndpoint + '?id=' + id + '&name=' + name)
            .toPromise()
            .then((ok) => {
              console.debug('name changed !');
              return 1;
            })
            .catch((err) => console.error(err));
  }

  setNewsletter(id: string, newsletter: Partial<Newsletter>): Promise<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Partial<Newsletter>>(this.apiHost + this.newslettersSetApiEndpoint + id, newsletter, httpOptions)
            .toPromise()
            .then((ok) => {
              console.debug('newsletter changed !');
              return 1;
            })
            .catch((err) => console.error(err));
  }

  getNewsletters(): Newsletter[] {
    return this.newsletters;
  }

  private dateFromMinutes(m: number): Date {
    let today:Date = new Date();
    today.setHours(m / 60, m % 60, 0);

    return today;
  }

  private tomorrowDateFromMinutes(m: number): Date {
    let tomorrow:Date = new Date();
    tomorrow.setHours(m / 60, m % 60, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tomorrow;
  }

  private hasReceivedToday(d: number): boolean {
    const today = new Date();
    const date = new Date(d);

    return (today.getDate() === date.getDate()
            && today.getMonth() === date.getMonth()
            && today.getFullYear() === date.getFullYear());
  }

}
