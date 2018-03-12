import { Injectable } from '@angular/core';
//import { packagesInShipment } from '../interfaces/packageShipment';
//import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, BehaviorSubject } from "rxjs/Rx";

@Injectable()
export class TextAdjustService {
    txtSub = new BehaviorSubject(true);

    constructor() {

    }

    recalculateAdjustments() {
        this.txtSub.next(true);
    }

    recalcEventSubscription(): Observable<boolean> {
        return this.txtSub;
    }
}
