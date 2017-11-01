import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {CrudService} from '../utils/crud.service';
import {WSReturn} from '../../models/ws-return';

@Injectable()
export class ProspectService extends CrudService<WSReturn> {

  constructor(_http: HttpClient) {
      super(_http, '/list');
   }

   public loadAll(): Observable<WSReturn> {
    return this._http.get<WSReturn>(`${this._baseUrl}`)
      .catch(this.handleError);
  }

}
