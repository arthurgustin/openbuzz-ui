import { Observable } from 'rxjs/Observable';
import {Prospect} from './prospect';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class ProspectData extends DataSource<any> {
      private  _prospects: BehaviorSubject<Prospect[]>;
      _filterChange = new BehaviorSubject('');
      get filter(): string { return this._filterChange.value; }
      set filter(filter: string) { this._filterChange.next(filter); }

      constructor(private prospects: BehaviorSubject<Prospect[]>, private _paginator: MatPaginator) {
        super();
        this._prospects = prospects;
    }

    connect(): Observable<Prospect[]> {
      const displayDataChanges = [
      this._prospects,
      this._paginator.page,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._prospects.getValue().slice().filter((item: Prospect) => {
        let searchIn = item.description + item.host;
        if (item.tags) {
          searchIn = searchIn + item.tags.toString();
        }
        const searchStr = (searchIn).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this._paginator.length = data.length;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }
    disconnect() {}

}
