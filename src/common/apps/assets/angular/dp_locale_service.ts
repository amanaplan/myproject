import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

const LOCALE_SERVICE_STARTED = 0;
const LOCALE_LOADED = 1;
const LOCALE_CHANGED = 2;

@Injectable()
export class DpLocaleService {
    savedLocales = {};
    curLocale = "en";

    msg = new BehaviorSubject(LOCALE_SERVICE_STARTED);

    constructor() {

    }

    //set current locale
    setLocale(locale:string) {
        this.curLocale = locale;

        this.msg.next(LOCALE_CHANGED);
    }

    //load a locale
    loadLocale(newLocaleName, newLocaleConfig) {
        this.savedLocales[newLocaleName] = newLocaleConfig;

        this.msg.next(LOCALE_LOADED);
    }

    //get currently set locale
    getCurrentLocale() {
        return this.curLocale;
    }

    //retrieves all locales
    retrieveAllLocales() {
        return this.savedLocales;
    }

    public messageSub() : Observable<number> {
        return this.msg;
    }
}
