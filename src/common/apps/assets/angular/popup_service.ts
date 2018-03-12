import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

const POPUPSERVICE_STARTED = 0;
const POPUPSERVICE_POPUPOPENED = 1;

@Injectable()
export class PopupService {
    msg = new BehaviorSubject(POPUPSERVICE_STARTED);

    constructor() {

    }

    public closeOpenedPopups() {
        this.msg.next(POPUPSERVICE_POPUPOPENED);
    }

    public messageSub() : Observable<number> {
        return this.msg;
    }
}
