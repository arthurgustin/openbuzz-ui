import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {ProspectService} from '../../services/prospect/prospect.service';
import {UrlsCrawl} from '../../models/urls-crawl';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {CrawlStateService} from '../../services/prospect/state-changed.service';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-button-add',
  templateUrl: 'button-add.component.html',
})
export class ButtonAddComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ButtonAddDialogComponent, {
      height: '70%',
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-button-add-dialog',
  templateUrl: 'button-add-dialog.component.html',
  animations: [
    trigger('heroState', [
      state('inactive', style({
        transform: 'rotate(0deg)',
      })),
      state('active',   style({
        transform: 'rotateY(179.9deg)',
      })),
      transition('inactive => active', animate('2000ms linear')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class ButtonAddDialogComponent implements OnInit {
  public formGroup: FormGroup;
  public icon = 'done';
  public state = 'inactive';
  private backgroundColor = 'green';

  constructor(private service: ProspectService, private crawlStateService: CrawlStateService, public snackBar: MatSnackBar) { }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.icon = 'loop';
  }

  ngOnInit() {
    this.initForm();
  }

  public changeIcon(newIcon: string ) {
    this.icon = newIcon ;
  }

  getStyle() {
    return this.backgroundColor;
  }

  crawl() {
    this.backgroundColor = 'blue';
    this.icon = 'loop';
    const urls: UrlsCrawl = new UrlsCrawl();
    urls.targetUrls = this.formGroup.get('urls').value.split('\n');
    this.service.crawlUrls(urls).then(
      (res) => {
        this.icon = 'done_all';
        this.backgroundColor = 'green';
        this.crawlStateService.stateChanged();
      },
      (err) => {
          this.icon = 'warning';
          this.backgroundColor = 'red';
          this.snackBar.open(`Server error: ` + err.toString(), 'OK', {
            duration: 5000,
          });
      }
    );
  }

  public initForm(): void {
    this.formGroup = new FormGroup({
      urls: new FormControl(''),
    });
  }
}
