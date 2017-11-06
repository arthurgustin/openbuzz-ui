import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {CrudService} from '../utils/crud.service';
import {WSReturn} from '../../models/ws-return';
import {UrlsCrawl} from '../../models/urls-crawl';

@Injectable()
export class ProspectService extends CrudService<WSReturn> {

  constructor(_http: HttpClient) {
      // super(_http, '/list');
      super(_http, 'http://localhost:1346/api/v1/list');
   }

   public loadAll(): Observable<WSReturn> {
    return this._http.get<WSReturn>(`${this._baseUrl}`)
      .catch(this.handleError);
  }

  public crawlUrls(urls: UrlsCrawl) {
    const body = JSON.stringify(urls);
    const headers = new Headers({'Content-Type': 'application/json'});

    return new Promise((resolve, reject) => {
      this._http
        .post('http://localhost:1346/api/v1/crawl', body, headers)
        .map(res => res)
        // This catch is very powerfull, it can catch all errors
        .catch((err: Response) => {
          // The err.statusText is empty if server down (err.type === 3)
          console.log((err.statusText || 'Can\'t join the server.'));
          // Really usefull. The app can't catch this in "(err)" closure
          reject((err.statusText || 'Can\'t join the server.'));
          // This return is required to compile but unuseable in your app
          return Observable.throw(err);
        })
        // The (err) => {} param on subscribe can't catch server down error so I keep only the catch
        .subscribe(data => {
          resolve(data);
        });
    });
  }
}
