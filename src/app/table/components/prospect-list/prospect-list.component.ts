import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Prospect} from '../../models/prospect';
import {ProspectService} from '../../services/prospect/prospect.service';
import {ProspectData} from '../../models/prospect-data';
import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'app-prospect-list',
  templateUrl: './prospect-list.component.html',
  styleUrls: ['./prospect-list.component.scss']
})
export class ProspectListComponent implements OnInit {
    private _prospects: BehaviorSubject<Prospect[]>;
    public dataSource: ProspectData | null;
    public displayedColumns = ['icon', 'domain', 'description', 'tags', 'emails', 'actions'];

    constructor(private prospectService: ProspectService) {
      this._prospects =  new BehaviorSubject<Prospect[]>([]);
      this.dataSource = new ProspectData(this._prospects.asObservable());
    }

    @ViewChild('filter') filter: ElementRef;

    ngOnInit() {
      this.loadData();
    }

    public loadData() {
      this.prospectService.loadAll()
        .subscribe(
          res => {
            const data = res.prospects;
            this._prospects.next(data);
          }
        );
    }

    public edit(prospect: Prospect) {

    }

    public delete(prospect: Prospect) {

    }

}
