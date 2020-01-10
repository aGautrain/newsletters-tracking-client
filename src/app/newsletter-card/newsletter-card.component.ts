import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { Newsletter } from '../newsletter';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


@Component({
  selector: 'app-newsletter-card',
  templateUrl: './newsletter-card.component.html',
  styleUrls: ['./newsletter-card.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class NewsletterCardComponent implements OnInit, OnChanges {



  @Input() newsletter: Newsletter;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    console.log(changes);
  }

  isWaiting(): boolean {
    return false;
  }

  isPrepared(): boolean {
    return false;
  }

  isSent(): boolean {
    return false;
  }

  isReceived(): boolean {
    return false;
  }

  save(): void {
    // TODO: API call
  }

}
