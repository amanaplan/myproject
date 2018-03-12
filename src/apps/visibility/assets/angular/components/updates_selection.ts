import { Component,  AfterViewInit, ViewChild, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';
import { Subject, Observable} from 'rxjs/Rx';

declare var $:any;
@Component({
    templateUrl: 'assets/resources/angular/visibility/assets/angular/templates/updates_selection.tpl.html',
})
export class UpdatesSelectionComponent {
    closeSubject = new Subject();
    doneSubject = new Subject();
    updatesSel:string = "0";
    attemptSubmit:boolean = false;

    constructor() {

    }

    checkFormValid():boolean {
        if (this.updatesSel == "1" || this.updatesSel == "2") {
            return true;
        }

        return false;
    }

    continueEvent():Observable<any> {
        return this.doneSubject;
    }

    continueBtn():void {
        this.attemptSubmit = true;
        this.doneSubject.next(true);
    }

    closeEvent():Observable<any> {
        return this.closeSubject;
    }

    closeBtn():void {
        this.closeSubject.next(true);
    }
}
