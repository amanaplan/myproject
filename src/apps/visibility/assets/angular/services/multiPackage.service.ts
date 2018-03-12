import { Injectable } from '@angular/core';
import { packageDetail } from '../interfaces/packageDetail';
//import { packagesInShipment } from '../interfaces/packageShipment';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class MultiPackageService {

    constructor(private http: Http) { }

    public getPackages() : Observable<packageDetail[]> {
        let url = "/assets/resources/angular/visibility/assets/angular/mocks/multiPackages.json";

        let resultObservable = this.http.get(url).catch(this.handleError);
        let pkgResults = resultObservable.map((res) => <packageDetail[]> res.json());
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
