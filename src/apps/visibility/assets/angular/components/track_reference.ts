import { Component,  AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';
import { Subject, Observable} from 'rxjs/Rx';
import { UpsDatePicker } from '../../../../../common/apps/assets/angular/upsdatepicker';

declare var $:any;
@Component({
    templateUrl: 'assets/resources/angular/visibility/assets/angular/templates/track_reference.tpl.html',
})
export class TrackReferenceComponent {
    closeSubject = new Subject();
    trkShipmentType = "1";
    trkReferenceForm:FormGroup;
    attemptSubmit:boolean = false;
    loggedin:boolean = false;
    trkShipperAcctSel = "0";

    @ViewChild('filterEndDatepicker') filterEndDatePicker;
    @ViewChild('filterStartDatepicker') filterStartDatePicker;
    filterStartDate:Date;
    filterEndDate:Date = new Date(2018, 4, 5);

    constructor(private fb:FormBuilder) {
        this.trkReferenceForm = fb.group({
            "trkShipmentReference" : ['', Validators.required],
            "trkRangeDateFrom" : ['', Validators.required],
            "trkRangeDateTo" : ['', Validators.required]
        });
    }

    ngAfterViewInit() {
        this.filterStartDatePicker.setConfig({
            //closeOnDatePick : true
            //minDate : new Date("January 31, 2018"),
            //maxDate : new Date("February 5, 2019")
        });
        //this.filterStartDatePicker.setDate
        /*console.log(this.dp);
        this.dp.onShown.subscribe((val) => console.log(val));*/
    }

    setLoggedIn(setVal) {
        this.loggedin = setVal;
    }

    trackBtn() {
        this.attemptSubmit = true;
        this.trkReferenceForm.controls['trkShipmentReference'].markAsTouched();
        this.trkReferenceForm.controls['trkRangeDateFrom'].markAsTouched();
        this.trkReferenceForm.controls['trkRangeDateTo'].markAsTouched();
    }

    closeEvent():Observable<any> {
        return this.closeSubject;
    }

    closeBtn():void {
        this.closeSubject.next(true);
    }
}
