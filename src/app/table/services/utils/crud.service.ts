import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';


export class CrudService<T> {
    protected _http: HttpClient;
    protected _baseUrl: string;

    public constructor(http: HttpClient, baseUrl: string) {
        this._http = http;
        this._baseUrl = baseUrl;
    }

    public get(id: number): Observable<T> {
        return this._http.get<T>(this._baseUrl + '/' + id)
                        .catch(this.handleError);
    }

    public save(data: T): Observable<T> {
        return this._http.post<T>(this._baseUrl, JSON.stringify(data))
                     .catch(this.handleError);
    }

    public delete(id: number): Observable<T> {
        return this._http.delete<T>(this._baseUrl + '/' + id.toString())
                        .catch(this.handleError);
    }

    public update(id: number, data: T): Observable<T> {
        return this._http.put<T>(this._baseUrl + '/' + id.toString(), JSON.stringify(data))
                        .catch(this.handleError);
    }

    protected handleError(error: any) {
        if (error._body && error._body.length > 0) {
            return Observable.throw(error.json().error);
        } else {
            try {
                return Observable.throw(JSON.parse(error.error));
            } catch (e) {
                return Observable.throw(error.error);
            }
        }
    }

}
