import { Component,  AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';
import { Subject, Observable} from 'rxjs/Rx';

declare var $:any;
@Component({
    templateUrl: 'assets/resources/angular/visibility/assets/angular/templates/import_numbers.tpl.html',
})
export class ImportNumbersComponent {
    closeSubject = new Subject();
    importResults = '0';

    constructor(private fb:FormBuilder) {
    }

    closeEvent():Observable<any> {
        return this.closeSubject;
    }

    closeBtn():void {
        this.closeSubject.next(true);
    }
}
