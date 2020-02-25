import { Injectable } from '@angular/core';

import { environment } from './../environments/environment';
import {Email, Engine, Newsletter, Sending} from './newsletter';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  emails: Email[] = [];
  sendings: Sending[] = [];
  engines: Engine[] = [];
  newsletters: Newsletter[] = [];

  constructor(private http: HttpClient) { }


  // Generic getter for resources

  private getAllResources(resourceType: ResourceType): Promise<any[]> {
    return this.http.get<any[]>(environment.apiUrl + resourceType).toPromise();
  }

  private getOneResource(resourceType: ResourceType, id: string): Promise<any> {
    return this.http.get<any>(environment.apiUrl + resourceType + '/' + id).toPromise();
  }



  // Implementations for resources

  getNewsletters(): Promise<Newsletter[]> {
    return this.getAllResources(ResourceType.Newsletter)
      .then(newsletters => {
        this.newsletters = newsletters;
        return newsletters;
      });
  }

  getNewsletter(id: string): Promise<Newsletter> {
    return this.getOneResource(ResourceType.Newsletter, id);
  }

  getEngines(): Promise<Engine[]> {
    return this.getAllResources(ResourceType.Engine)
      .then(engines => {
        this.engines = engines;
        return engines;
      });
  }

  getEngine(id: string): Promise<Engine> {
    return this.getOneResource(ResourceType.Engine, id);
  }

  getSendings(): Promise<Sending[]> {
    return this.getAllResources(ResourceType.Sending)
      .then(sendings => {
        this.sendings = sendings;
        return sendings;
      });
  }

  getSending(id: string): Promise<Sending> {
    return this.getOneResource(ResourceType.Sending, id);
  }

  getEmails(): Promise<Email[]> {
    return this.getAllResources(ResourceType.Email)
      .then(emails => {
        this.emails = emails;
        return emails;
      });
  }

  getEmail(id: string): Promise<Email> {
    return this.getOneResource(ResourceType.Email, id);
  }

}

enum ResourceType {
  Engine = 'engines',
  Newsletter = 'newsletters',
  Sending = 'sendings',
  Email = 'emails'
}
