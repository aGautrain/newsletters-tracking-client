import { Component, Inject } from '@angular/core';
import { NewslettersService } from './newsletters.service';
import { Newsletter, ScriptExecutionResult } from './newsletter';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pendingNewsletters: Newsletter[] = [];
  newslettersSent: Newsletter[] = [];

  constructor(private newsletterService: NewslettersService, public dialog: MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.refreshNewsletters();
  }

  openDialogName(nl: Newsletter) {

    const dialogRef = this.dialog.open(DialogEditNewsletterName, {
      width: '400px',
      data: nl
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.newsletterService.setNewsletterName(nl.id, name);
      }
    });
  }

  openDialogSummary(nl: Newsletter) {

    const dialogRef = this.dialog.open(DialogEditNewsletter, {
      width: '400px',
      data: nl
    });

    dialogRef.afterClosed().subscribe(nlModified => {
      // TODO API call
    });
  }

  refreshNewsletters(): void {
    this.newsletterService.getNewslettersFromServer().then((nl) => {
      this.pendingNewsletters = nl.filter((newsletter) => !newsletter.arrivedToday);
      this.newslettersSent = nl.filter((newsletter) => newsletter.arrivedToday);
    });
  }

  syncWithGmail() {
    (document.querySelector('.gmail-btn') as any).disabled = true;
    this.newsletterService.callGmailApi().then((res: ScriptExecutionResult) => {
      console.debug(res);
      if (res.messagesProcessed) {
        const snackbarRef = this.snackbar.open(res.messagesProcessed + ' nouveaux emails, ' + res.newslettersModified + ' newsletters modifiées et ' + res.newslettersCreated + ' newsletters créées',
                                                'OK',
                                                { duration: 5000 }
                                              );

         this.refreshNewsletters();
      } else {
        const snackbarRef = this.snackbar.open('Aucun nouvel email à synchroniser !',
                                                'OK',
                                              { duration: 2500 }
                                            );
      }

    });
    setTimeout(() => {
      (document.querySelector('.gmail-btn') as any).disabled = false;
    }, 10000);
  }


}

// DIALOGS


@Component({
  selector: 'dialog-edit-newsletter-name',
  templateUrl: 'dialog-edit-newsletter-name.html',
})
export class DialogEditNewsletterName {

  constructor(
    public dialogRef: MatDialogRef<DialogEditNewsletterName>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-edit-newsletter',
  templateUrl: 'dialog-edit-newsletter.html',
})
export class DialogEditNewsletter {

  constructor(
    public dialogRef: MatDialogRef<DialogEditNewsletter>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
