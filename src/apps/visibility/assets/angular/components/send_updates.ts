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
    templateUrl: 'assets/resources/angular/visibility/assets/angular/templates/send_updates.tpl.html',
})
export class SendUpdatesComponent {
    packageUpdates = {
        "notifyCurStatus" : true,
        "notifyDelay" : true,
        "notifyDelivered" : true,
        "notifyReadyPickup" : true,
        "notifications" : [
            {
                "sendUpdatesType" : "0",
                "language" : "0",
                "recipientEmailPhone" : "",
                "mobileNumSel" : "0"
            }
        ],
        "notifyProblem" : false,
        //"addPersonalMsg" : false,
        "personalName": "",
        "personalMsg" : "",
        "problemName" : "",
        "problemEmail" : ""
    }

    addRecipientSubject = new Subject();
    removeRecipientSubject = new Subject();
    doneSubject = new Subject();
    cancelSubject = new Subject();

    attemptSubmit:boolean = false;

    loggedin:boolean = false;

    notificationForm:FormGroup;

    vpSize:vp;

    @ViewChildren('pkgUpdatesHeader') pkgUpdatesHeader;
    @ViewChildren('errorList') errorList;

    constructor(private fb:FormBuilder, private viewport:ViewPorts, private route:Router) {
        viewport.viewPortChange().subscribe((val) => {
            this.vpSize = val;
        });

        route.events.subscribe((val) => {
            if (route.url == '/loggedin') {
                this.loggedin = true;
            } else {
                this.loggedin = false;
            }
        })
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.notificationForm = new FormGroup({
            'notifications': this.fb.array(
                this.getNotificationsControls()
            ),
            'notificationSettings' : this.fb.group({
                'pkgUpdatesCurStatus' : true,
                'pkgUpdatesDelay' : true,
                'pkgUpdatesDelivered' : true,
                'pkgUpdatesReadyPickup' : true
            }),
            "notificationFailure" : this.fb.group({
                'problemEmail' : ['', Validators.required]
            })/*,
            'notificationOptions' : this.fb.group({
                'notifyAgreeSMS' : ['', Validators.required]
            })*/
        });
    }

    getNotificationsControls() {
        var ret=[];

        for (var m = 0; m < this.packageUpdates.notifications.length; m++) {
            if (this.packageUpdates.notifications[m].sendUpdatesType == "0") {
                ret.push(this.fb.group(
                    {
                        pkgUpdatesEmailPhone : [this.packageUpdates.notifications[m].recipientEmailPhone, Validators.required]
                    }
                ));
            } else {
                ret.push(this.fb.group(
                    {
                        pkgUpdatesEmailPhone : ["5555555555"]
                    }
                ));
            }
        }

        return ret;
    }

    notifyTypeChange() {
        this.initForm();

        if (this.attemptSubmit) {
            this.markNotifyFieldsTouched();
        }
    }

    addRecipientEvent():Observable<any> {
        return this.addRecipientSubject;
    }

    addRecipientBtn():void {
        this.addRecipientSubject.next(true);
        this.packageUpdates.notifications.push({
            "sendUpdatesType" : "0",
            "recipientEmailPhone" : "",
            "language" : "0",
            "mobileNumSel" : "0"
        });
        this.initForm();

        if (this.attemptSubmit) {
            this.markNotifyFieldsTouched();
        }

        var that = this;
        setTimeout(function () {
            that.pkgUpdatesHeader.last.nativeElement.focus();
        })

    }

    removeRecipientEvent():Observable<any> {
        return this.removeRecipientSubject;
    }

    removeRecipientBtn(j):void {
        this.removeRecipientSubject.next(j);
        this.packageUpdates.notifications.splice(j, 1);

        this.initForm();
    }

    doneEvent():Observable<any> {
        return this.doneSubject;
    }

    doneBtn():void {
        var retData = {
            'formValid' : true,
            'notificationsSelected' : {
                'pkgUpdatesCurStatus' : true,
                'pkgUpdatesDelay' : true,
                'pkgUpdatesDelivered' : true,
                'pkgUpdatesReadyPickup' : true
            }
        };

        this.attemptSubmit = true;
        //set all to as touched
        this.markNotifyFieldsTouched();

        //this.notificationForm.get('notificationOptions').get('notifyAgreeSMS').markAsTouched();

        retData.notificationsSelected.pkgUpdatesCurStatus = this.packageUpdates.notifyCurStatus;
        retData.notificationsSelected.pkgUpdatesDelay = this.packageUpdates.notifyDelay;
        retData.notificationsSelected.pkgUpdatesDelivered = this.packageUpdates.notifyDelivered;
        retData.notificationsSelected.pkgUpdatesReadyPickup = this.packageUpdates.notifyReadyPickup;

        if (!this.checkNotifySelected() || !this.checkFormValid()) {
            retData.formValid = false;
            this.doneSubject.next(retData);
            this.focusError();
            return;
        }

        this.doneSubject.next(retData);
    }

    focusError() {
        var that = this;

        setTimeout(function () {
            if (that.errorList.length > 0) {
                that.errorList.first.nativeElement.querySelector('ul li:first-child a').focus();
            }
        });
    }

    cancelEvent():Observable<any> {
        return this.cancelSubject;
    }

    cancelBtn():void {
        this.cancelSubject.next(true);
    }

    checkFormValid() {
        /*if ((this.checkOnePhoneSelected() && !this.notificationForm.get('notificationOptions').valid)) {
            return false;
        }*/

        if (this.packageUpdates.notifyProblem && !this.notificationForm.get('notificationFailure').valid) {
            return false;
        }

        return ((this.notificationForm.get('notifications').valid && this.notificationForm.get('notificationSettings').valid));
    }

    checkNotifySelected() {
        if (!this.packageUpdates.notifyCurStatus
            && !this.packageUpdates.notifyDelay
            && !this.packageUpdates.notifyDelivered
            && !this.packageUpdates.notifyReadyPickup) {
            return false;
        }

        return true;
    }

    checkOneEmailSelected() {
        for (var m = 0; m < this.packageUpdates.notifications.length; m++) {
            if (this.packageUpdates.notifications[m].sendUpdatesType == '0') {
                return true;
            }
        }

        return false;
    }

    checkOnePhoneSelected() {
        for (var m = 0; m < this.packageUpdates.notifications.length; m++) {
            if (this.packageUpdates.notifications[m].sendUpdatesType == '1') {
                return true;
            }
        }

        return false;
    }

    numPhoneSelected() {
        var numSel = 0;

        for (var m = 0; m < this.packageUpdates.notifications.length; m++) {
            if (this.packageUpdates.notifications[m].sendUpdatesType == '1') {
                numSel++;
            }
        }

        return numSel;
    }

    markNotifyFieldsTouched() {
        for (var m = 0; m < this.packageUpdates.notifications.length; m++) {
            this.notificationForm.get('notifications').get(m.toString()).get('pkgUpdatesEmailPhone').markAsTouched();
        }

        this.notificationForm.get('notificationFailure').get('problemEmail').markAsTouched();
    }

    setLoggedIn(setVal:boolean) {
        this.loggedin = setVal;
    }
}
