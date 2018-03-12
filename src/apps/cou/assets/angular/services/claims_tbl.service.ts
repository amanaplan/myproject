import { Injectable } from '@angular/core';
//import { packagesInShipment } from '../interfaces/packageShipment';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ClaimsService {

    constructor(private http: Http) { }

    public getClaims(type) : Observable<any> {
        let url;
        switch (type) {
            case 'all' : url = "/assets/resources/angular/cou/assets/angular/mocks/claims_tbl_full.json";
            break;
            case 'none' : url = "/assets/resources/angular/cou/assets/angular/mocks/claims_tbl_empty.json";
            break;
        }


        let resultObservable = this.http.get(url).catch(this.handleError);
        let pkgResults = resultObservable.map((res) => res.json());
        return pkgResults;
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
