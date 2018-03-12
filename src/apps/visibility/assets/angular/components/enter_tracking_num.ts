import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';
declare var $:any;

import { TrackReferenceComponent } from './track_reference';
import { ImportNumbersComponent } from './import_numbers';
import { OtherTrackingServicesComponent } from './other_tracking_services';

@Component({
    templateUrl: 'assets/resources/angular/visibility/assets/angular/templates/enter_tracking_num.tpl.html',
})
export class EnterTrackingComponent {
    trackingNums:string = "";
    formSubmitted:boolean = false;
    multipleTrackNumsEntered:boolean = false;
    loggedin:boolean = false;
    enterTrkNumLines:number = 2;

    trackingForm:FormGroup;

    @ViewChild('trackReferenceModal') trackReferenceModal;
    @ViewChild('importTrackingNumModal') importTrackingNumModal;
    @ViewChild('otherTrackingModal') otherTrackingModal;

    constructor(fb: FormBuilder, public _router: Router) {
        this.trackingForm = fb.group({
            'trackingNums' : ['', Validators.required]
        });

        _router.events.subscribe((val) => {
            if (_router.url == '/enternum/loggedin') {
                this.loggedin = true;

                //this.setModalLoggedIn();
            }
        });
    }

    ngAfterViewInit() {
        this.trackReferenceModal.setProperties({
            title : "Track by Reference Number",
            component : TrackReferenceComponent
        });

        this.otherTrackingModal.setProperties({
            title : "Other Tracking Services",
            component : OtherTrackingServicesComponent
        });

        this.importTrackingNumModal.setProperties({
            title : "Import Tracking Numbers",
            component : ImportNumbersComponent
        });

        this.trackReferenceModal.modalCompCreated().subscribe((val) => {
            val.setLoggedIn(this.loggedin);

            val.closeEvent().subscribe((newval) => {
                this.trackReferenceModal.closePopup();
            });
        });

        this.importTrackingNumModal.modalCompCreated().subscribe((val) => {
            val.closeEvent().subscribe((newval) => {
                this.importTrackingNumModal.closePopup();
            });
        });

        this.otherTrackingModal.modalCompCreated().subscribe((val) => {
            val.closeEvent().subscribe((newVal) => {
                this.otherTrackingModal.closePopup();
            });
        })
    }

    checkForm() {
        this.formSubmitted = true;
        this.trackingForm.controls['trackingNums'].markAsTouched();
    }

    /*trackNumPaste(e) {
        //console.log('ff');
        console.log(e);
    }

    trackNumKeyPress(e) {
        //console.log(e);
        if (e.keyCode == 13) {
            //console.log('enter')
        }
    }*/
    trackNumChange() {
        /*if (this.trackingNums.match(/(?:\r\n|\r|\n)/g)) {
            this.multipleTrackNumsEntered = true;
        }*/
        var trkNewLines = this.trackingNums.split(/\r\n|\r|\n/).length;

        this.enterTrkNumLines = (trkNewLines + 1);
    }

    trackNumKeyDown(e) {
        /*console.log(e);
        if (e.which === 13 && this.enterTrkNumLines == 26) {
            e.preventDefault();
        }*/
    }

    trackReferenceBtn() {
        this.trackReferenceModal.open();
    }

    importTrackNum() {
        this.importTrackingNumModal.open();
    }

    otherTrackingBtn() {
        this.otherTrackingModal.open();
    }
}
