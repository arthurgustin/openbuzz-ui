import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {MatDialog, MatPaginator, MatSnackBar} from '@angular/material';
import {Prospect} from '../../models/prospect';
import {ProspectService} from '../../services/prospect/prospect.service';
import {ProspectData} from '../../models/prospect-data';
import {Observable} from 'rxjs/Observable';
import {PageEvent} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {CrawlStateService} from '../../services/prospect/state-changed.service';
import {DialogComponent} from '../../../shared/components/dialog/dialog.component';
import {DialogType} from '../../../shared/models/dialog-type';

@Component({
  selector: 'app-prospect-list',
  templateUrl: './prospect-list.component.html',
  styleUrls: ['./prospect-list.component.scss']
})
export class ProspectListComponent implements OnInit {
    public  _prospects: BehaviorSubject<Prospect[]>;
    public dataSource: ProspectData | null;
    public displayedColumns = ['icon', 'domain', 'description', 'tags', 'emails', 'actions'];

    @ViewChild('filter') filter: ElementRef;
    @ViewChild('paginator') paginator: MatPaginator;
    @Input() hidden: boolean;

    pageEvent: PageEvent;

    subscription: Subscription;

    constructor(public dialog: MatDialog, private prospectService: ProspectService, private crawlStateService: CrawlStateService,
                public snackBar: MatSnackBar) {
      this.subscription = this.crawlStateService.stateChanging.subscribe(message => {
        this.loadData();
      });
    }

    ngOnInit() {
      this._prospects =  new BehaviorSubject<Prospect[]>([]);
      this.dataSource = new ProspectData(this._prospects, this.paginator);
      this.loadData();
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
    }

    public loadData() {
      this.prospectService.loadAll()
        .subscribe(
          res => {
              const data = res.prospects;
              this._prospects.next(data);
          },
          err =>  {
            this.hidden = true
            this.snackBar.open(`Can't join the database`);
          },
        );
    }

    public edit(prospect: Prospect) {

    }

    public delete(prospect: Prospect) {
      this.prospectService.deleteProspect(prospect.id)
        .subscribe(
          result => this.loadData(),
          error => this.snackBar.open(`Server error: ` + error.toString(), 'OK', {
            duration: 5000,
          }),
        );
    }

  delete2(prospect: Prospect): void {
    const dialogRef = this.dialog.open(DialogComponent, { disableClose : true} );
    dialogRef.componentInstance.toDelete = prospect.host;
    dialogRef.componentInstance.type = DialogType.confirmDeleteMessage;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'OK') {
        this.prospectService.deleteProspect(prospect.id)
          .finally(() => this.loadData())
          .subscribe(
            res => this.loadData(),
            error => this.snackBar.open(`Server error: ` + error.toString(), 'OK', {
              duration: 5000,
            }),
          );
      }
    });
  }

}
