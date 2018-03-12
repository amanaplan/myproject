import { Injectable } from '@angular/core';
import { returnHistory } from '../interfaces/returnHistory';
import { returnHistoryDetail } from '../interfaces/returnHistoryDetail';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class returnHistoryService {

    constructor(private http: Http) { }

    public getReturns() : Observable<returnHistory[]> {
        let url = "/assets/resources/angular/rap/assets/angular/mocks/returnHistory.json";

        let resultObservable = this.http.get(url).catch(this.handleError);
        let returnResults = resultObservable.map((res) => <returnHistory[]> res.json());
        return returnResults;
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.log(errMsg);

        return Observable.throw(errMsg);
    }
}
