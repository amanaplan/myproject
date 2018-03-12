import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

function _window() : any {
    // return the global native browser window object
    return window;
}

@Injectable()
export class BrowserWindow {
    get nativeWindow() : any {
        return _window();
    }

    width$:Observable<number>;
    height$:Observable<number>;

    constructor() {
        let winSize$ = new BehaviorSubject(getWindowSize());

        this.height$ = (winSize$.pluck('height') as Observable<number>).distinctUntilChanged();
        this.width$ = (winSize$.pluck('width') as Observable<number>).distinctUntilChanged();

        Observable.fromEvent(window, 'resize').map(getWindowSize).subscribe(winSize$);
    }
}

function getWindowSize() {
    return {
        height : _window().innerHeight,
        width : _window().innerWidth
    }
}
