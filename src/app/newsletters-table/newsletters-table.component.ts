import { Component, Input, Output, OnChanges, OnInit, ViewChild, EventEmitter } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NewslettersService } from '../newsletters.service';
import { Newsletter, ScriptExecutionResult, NewsletterStatus } from '../newsletter';

@Component({
  selector: 'app-newsletters-table',
  templateUrl: './newsletters-table.component.html',
  styleUrls: ['./newsletters-table.component.scss']
})
export class NewslettersTableComponent implements OnInit {

  @Input() newsletters: Newsletter[];
  @Output() onSelectName = new EventEmitter<Newsletter>();
  @Output() onSelect = new EventEmitter<Newsletter>();
  DISPLAYED_COLUMNS: string[] = ['name', 'expeditor', 'expectedDateTime', 'status', 'arrivedToday'];

  dataSource = new MatTableDataSource(this.newsletters);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }


  ngOnInit() {

    this.dataSource.sort = this.sort;

    // this.newsletterService.callGmailApi();
  }

  ngOnChanges(changes) {
    if (changes.newsletters) {
      this.dataSource.data = changes.newsletters.currentValue;
    }
  }

  statusScheduled() {
    return NewsletterStatus.SCHEDULED;
  }

  statusOnTime() {
    return NewsletterStatus.ON_TIME;
  }

  statusLate() {
    return NewsletterStatus.LATE;
  }

  statusNotSent() {
    return NewsletterStatus.NOT_SENT;
  }

  openCardForEditingName(newsletter: Newsletter): void {
    this.onSelectName.emit(newsletter);
  }

  openCardForEditing(newsletter: Newsletter): void {
    this.onSelect.emit(newsletter);
  }

}
