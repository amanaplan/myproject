import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var jQuery:any;

@Component({
    /*selector: 'ups-pickup-point',*/
    templateUrl: 'assets/resources/angular/uppwa/assets/angular/templates/delivery_manage.tpl.html'
})
export class DeliveryComponent {
    /*constructor() {
    }*/

    alertsSignedUp:boolean = false;

    pickupDefault:boolean = true;
    pickupHistory:boolean = false;
    pickupSuccess:boolean = false;
    pickupNoAction:boolean = false;
    pickupMissed:boolean = false;
    pickupAdditionalResults: boolean = false;
    pickupNone:boolean = false;
    pickupError:boolean = false;

    pickupStatusDefault:boolean = true;
    pickupStatusNone:boolean = false;
    pickupStatusToday:boolean = false;
    pickupStatusTomorrow:boolean = false;
    pickupStatusPassed:boolean = false;
    pickupStatusNotToday:boolean = false;
    pickupStatusError:boolean = false;
    pickupStatusServicePassed: boolean = false;

    pickupSuccessNoAction:boolean = false;
    pickupSuccessOnDemandSuccess:boolean = false;
    pickupSuccessOnDemandOtherDay:boolean = false;

    pickupMissedPassed:boolean = false;
    pickupMissedPassedDayChoices:boolean = false;

    pickupMissedNotSet:boolean = false;

    pickupOnCall:boolean = false;
    pickupRequestOnCallServiceResults: boolean = false;
    pickupExamples: boolean = false;
    pickupExamplesOne: boolean = false;
    pickupExamplesTwo: boolean = false;

    constructor(public _router: Router, public _route: ActivatedRoute, fb: FormBuilder) {

    }

    ngOnInit() {
        /*this._router.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.getManageId(+params['id']))
            .subscribe((hero: Hero) => this.hero = hero);*/

        let id = +this._route.snapshot.params['id'];

        jQuery('#pickupModal').modal('show');
    }

    alertSubscribe():void {
        this.alertsSignedUp = true;
    }

    clearAllDisplay():void {
        this.pickupDefault = false;
        this.pickupHistory = false;
        this.pickupSuccess = false;
        this.pickupNoAction = false;
        this.pickupMissed = false;
        this.pickupAdditionalResults = false;
        this.pickupNone = false;
        this.pickupError = false;

        this.pickupStatusDefault = false;
        this.pickupStatusNone = false;
        this.pickupStatusToday = false;
        this.pickupStatusTomorrow = false;
        this.pickupStatusPassed = false;
        this.pickupStatusNotToday = false;
        this.pickupStatusError = false;
        this.pickupStatusServicePassed = false;

        this.pickupSuccessNoAction = false;
        this.pickupSuccessOnDemandSuccess = false;
        this.pickupSuccessOnDemandOtherDay = false;

        this.pickupMissedPassed = false;
        this.pickupMissedPassedDayChoices = false;
        this.pickupOnCall = false;
        this.pickupRequestOnCallServiceResults = false;
        this.pickupExamples = false;
        this.pickupExamplesOne = false;
        this.pickupExamplesTwo = false;
    }


    demoHistoryDisplay():void {
        this.clearAllDisplay();
        this.pickupHistory = true;
    }

    demoDefaultDisplay():void {
        this.clearAllDisplay();
        this.pickupStatusDefault = true;
        this.pickupDefault = true;
    }

    demoSuccessDisplay():void {
        this.clearAllDisplay();
        this.pickupStatusDefault = false;
        //this.pickupStatusNone = false;
        this.pickupStatusToday = true;
        this.pickupSuccess = true;
    }

    demoSuccessNoActionDisplay():void {
        this.clearAllDisplay();
        this.demoSuccessDisplay();
        //this.pickupStatusDefault = false;
        this.pickupStatusToday = false;
        this.pickupStatusNone = true;
        this.pickupSuccessNoAction = true;
    }

    demoPastCutOffA():void {
        this.clearAllDisplay();
        this.pickupMissed = true;
        this.pickupStatusNone = false;
        this.pickupStatusServicePassed = true;
    }

    demoMissedNoChoicesDisplay():void {
        this.clearAllDisplay();
        this.pickupStatusDefault = false;
        this.pickupStatusNone = false;
        this.pickupStatusPassed = true;
        this.pickupMissed = true;
        this.pickupMissedPassed = true;
    }

    demoPastCutOffB():void {
        this.clearAllDisplay();
        //this.demoMissedNoChoicesDisplay();
        this.pickupMissed = true;
        this.pickupMissedPassed = true;
        this.pickupStatusServicePassed = true;
        this.pickupMissedPassedDayChoices = true;
    }

    demoOnCall():void {
        this.clearAllDisplay();
        this.demoRequestOnCallService();
        this.pickupAdditionalResults = true;
        this.pickupStatusServicePassed = true;
        this.pickupOnCall = true;
        this.pickupRequestOnCallServiceResults = false;
        this.pickupStatusNone = false;
    }

    demoRequestOnCallService(): void {
        this.clearAllDisplay();
        this.pickupAdditionalResults = true;
        this.pickupRequestOnCallServiceResults = true;
        this.pickupStatusNone = true;
    }

    /*demoRequestPickupAfterMissed():void {
        this.clearAllDisplay();
        this.pickupSuccess = true;
        this.pickupStatusNone = false;
        this.pickupStatusDefault = false;
        this.pickupStatusTomorrow = true;
        this.pickupSuccessOnDemandOtherDay = true;
    }*/

    demoOnDemandNoPickuptimeDisplay():void {
        this.clearAllDisplay();
        this.pickupMissed = true;
        this.pickupStatusDefault = false;
        this.pickupStatusNone = false;
        this.pickupStatusNotToday = true;
        this.pickupMissedNotSet = true;
    }

    demoExamplesOne(): void {
        this.clearAllDisplay();
        this.pickupStatusTomorrow = true;
        this.pickupAdditionalResults = true;
        this.pickupExamples = true;
        this.pickupExamplesOne = true;
    }

    demoExamplesTwo(): void {
        this.clearAllDisplay();
        this.pickupStatusTomorrow = true;
        this.pickupAdditionalResults = true;
        this.pickupExamples = true;
        this.pickupExamplesTwo = true;
    }

    demoErrorDisplay():void {
        this.clearAllDisplay();
        this.pickupStatusDefault = false;
        this.pickupStatusNone = false;
        this.pickupStatusError = true;
        this.pickupError = true;
    }

    /*getManageId(id) {

    }*/
}
