import { Observable } from 'rxjs/Observable';
import {Prospect} from './prospect';
import {DataSource} from '@angular/cdk/collections';

export class ProspectData extends DataSource<any> {
    constructor(private _prospects: Observable<Prospect[]>) {
        super();
    }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Prospect[]> {
      return this._prospects;
    }
    disconnect() {}

}
