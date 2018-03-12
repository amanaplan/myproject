import { Injectable } from '@angular/core';
import { packageDetail } from '../interfaces/packageDetail';
import { packagesInShipment } from '../interfaces/packageShipment';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class PackageMilestoneService {

    //resultObservable:Observable<packageDetail[]>;

    constructor(private http: Http) { }

    public getPackageProgress(file) : Observable<packageDetail[]> {
        let url;
        switch (file) {
            case 'orderPickup' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageMilestonePickup.json";
            break;
            case 'orderProcessed' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageMilestoneProcessed.json";
            break;
            case 'delivered' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageMilestoneDelivered.json";
            break;
            case 'return' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageMilestoneReturn.json";
            break;
            case 'outDelivery' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageMilestoneOutDelivery.json";
            break;
            case 'transitUPGF' :
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageMilestoneTransitUPGF.json";
            break;
            default:
                url = "/assets/resources/angular/visibility/assets/angular/mocks/packageMilestoneTransit.json";
            break;
        }


        let resultObservable = this.http.get(url).catch(this.handleError);
        //this.resultObservable = this.http.get(url).catch(this.handleError);
        let pkgResults = resultObservable.map((res) => <packageDetail[]> res.json());
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
