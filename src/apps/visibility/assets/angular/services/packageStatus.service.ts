import { Injectable } from '@angular/core';
import { packageStatus } from '../interfaces/packageStatus';
import { packagesInShipment } from '../interfaces/packageShipment';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class PackageStatusService {

    //resultObservable:Observable<packageDetail[]>;

    constructor(private http: Http) { }

    public getPackageStatus(file) : Observable<packageStatus[]> {
        let url;
        switch (file) {
            case 'unavailable' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageUnavailable.json";
            break;
            case 'orderProcessed' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageProcessed.json";
            break;
            case 'orderPickup' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packagePickup.json";
            break;
            case 'outDelivery' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageOutDelivery.json";
            break;
            case 'delivered' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageDelivered.json";
            break;
            case 'exception' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageException.json";
            break;
            case 'exceptionAlert' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageExceptionAlert.json";
            break;
            case 'return' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageReturn.json";
            break;
            case 'apPickup' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageAP.json";
            break;
            case 'transitFGVMI' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageTransitFGVMI.json";
            break;
            case 'transitUPGF' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageTransitUPGF.json";
            break;
            default:
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageTransit.json";
            break;
        }


        let resultObservable = this.http.get(url).catch(this.handleError);
        //this.resultObservable = this.http.get(url).catch(this.handleError);
        let pkgResults = resultObservable.map((res) => <packageStatus[]> res.json());
        return pkgResults;
    }

    //public reloadProgress() {
        //Observable.onN
    //}

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
