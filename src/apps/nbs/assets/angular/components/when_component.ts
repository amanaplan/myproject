import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { nbsComp } from '../services/nbs_comp';
import { INBS } from '../interfaces/inbs';

import { NBSScheduleComponent } from './schedule_component';
import { InbsFormErrors } from "../interfaces/iNBSErrors";

declare var $:any;

// const NBS_SCHEDULE_LIST_VIEW = 0;
// const NBS_SCHEDULE_GRID_VIEW = 1;


@Component({
    selector: 'ups-nbs-when-section',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/when_section.tpl.html'
})
export class NBSWhenComponent implements INBS {


    demoShipSumary: string = 'guest';

    /*properties*/
    //Global Var
    nbsBase:nbsComp;
    nbsSpaSectionWhen:FormGroup; //formGroup object for NBS spa
    nbsSpaFormSubmitAttempt:boolean = false;
    /*whenSchedComm:NBSScheduleComponent; //used to communicate with Schedule Component*/

    //local var
    accessPoint: boolean = false;
    accessPointReview:boolean = false;
    accessEmail:boolean = false;
    accessSMS:boolean = false;
    whenHeaderDefault:boolean = true;
    whenDeliveryAvailable:boolean = true;
    whenPickupEdit:boolean = false;
    whenRecieverEdit:boolean = false;
    whenScheduleEdit:boolean = false;
    whenReviewSwitch:boolean = true;
    whenReviewPickupYes:boolean = true;
    whenReviewPickupYesSmart:boolean = false;
    whenReviewPickupNo:boolean = false;
    whenReviewReciever:boolean = false;
    whenDepricated:boolean = false;
    whenShipmentEntrance:string = '0';
    whenNoPkupHasContent:boolean = true;
    whenPickupAvailable:boolean = true;
    whenEditAdd:boolean = false;
    whenEditPkupDetails:boolean = false;
    whenPickupDateContent:boolean = false;
    whenSmartPickupShipTip:boolean = false;
    whenShipTip1:boolean = false;
    whenSmartPickupTooLateShipTip:boolean = false;
    whenpkupAddContent:boolean = false;
    district:boolean = false;
    whenPkupDetailsContent:boolean = false;
    whenOnCallContent:boolean = false;
    whenPendingOnCallPickups:boolean = false;
    whenPkupOtherAvailableContent:boolean = false;
    whenPkupLocationContent:boolean = false;
    whenLike2DoContent:boolean = false;
    whenPendingPickup:boolean = false;
    whenScheduleOnCall:boolean = false;
    whenSmartPickupToday:boolean = false;
    whenSmartPickupTomorrow:boolean = false;
    smartRequest:boolean = false;
    whenIncludeSmartPickup:boolean = false;
    whenPendingOnCall:boolean = false;
    whenLiftgateContent:boolean = false;
    whenHold4Pkup:boolean = true;
    whenPkupOptions:boolean = false;
    whenSmartYesHeader:boolean = false;
    whenDropoffnAvailable:boolean = false;
    whenDropoffCal:boolean = true;
    whenDropoffInfo:boolean = false;
    whenDaily:boolean = false;
    whenSmart:boolean = false;
    category:string = "default";

    whenShipmentDelivery:string = '0';
    whenNoDeliverHasContent:boolean = false;
    whenLoadingDockContent:boolean = false;
    whenSelectByLocation:boolean = true;
    whenHoldLocName:boolean = false;
    whenHoldHours:boolean = false;
    whenHoldAtLocation:boolean = true;
    whenHoldLocSwitch:boolean = true;
    whenHldLocSwitchCol:boolean = true;
    toHeavyShipTip:boolean = false;

    demoSelect:string = 'defPicknAv';
    enterAlertEmail:boolean = false;
    defaultHold:boolean = true;
    schedViewBtn:string = '0';

    language = [
        {
            "val" : "us_en",
            "name" : "United States - English"
        },
        {
            "val" : "us_es",
            "name" : "Estados Unidos - Español"
        },
        {
            "val" : "mx_es",
            "name" : "Mexico - Español"
        },
        {
            "val" : "dk_da",
            "name" : "Danmark - Dansk"
        },
        {
            "val" : "fi_fi",
            "name" : "Suomi - suomi"
        },
        {
            "val" : "de_de",
            "name" : "Deutschland - Deutsch"
        },
        {
            "val" : "it_it",
            "name" : "Italia - Italiano"
        },
        {
            "val" : "ar_es",
            "name" : "Argentina - Español"
        }
    ];

    demoDropDown = [
        {val : '0', copy : '**** Default ****', disabled : true},
        {val : 'defPicknAv', copy : 'Pickup not Available', selected : true},
        {val : 'defAddPick', copy : 'Add Pickup'},
        {val : 'defOnCall', copy : 'On Call - Scheduled'},
        {val : 'defAddPickOnCall', copy : 'Add Pickup &amp; On Call'},
        {val : 'defPickDaily', copy : 'Pickup Daily'},
        {val : 'defPickDailyOnCall', copy : 'Pickup Daily  On Call'},
        {val : 'defOther', copy : 'Other Available - Not Selected'},
        {val : '1', copy : '**** WWEF ****', disabled : true},
        {val : 'wwefDel', copy : 'UPS Delivery'},
        {val : 'wwefHold', copy : 'Hold for Pickup'},
        {val : 'wwefDrop', copy : 'Dropoff'},
        {val : 'wwefDropAv', copy : 'Dropoff not Available'},
        {val : 'wwef2Heavy', copy : 'Too Heavy'},
        {val : '2', copy : '**** Smart Service ****', disabled : true},
        {val : 'smartInclude', copy : 'Requested - Include'},
        {val : 'smartPend', copy : 'Requested - w/ Pending On Call'},
        {val : 'smartOnCall', copy : 'Requested - Add On Call'},
        {val : 'smartAddPickOnCall', copy : 'Requested - Add Pickup On Call'},
        {val : 'smartPast', copy : 'Requested - Past Notify Time'},
        {val : 'smartReqTooLate', copy : 'Requested - Past Pickup Window'},
        {val : 'smartTooLate', copy : 'Cannot Schedule - Past Pickup Window'},
        {val : 'smartNotReq', copy : 'Not Requested'},
        {val : 'smartAccount', copy : 'Account in Profile Not Selected'},
        {val : '3', copy : '**** Day Specific Service ****'},
        {val : 'daySpecOnCall', copy : 'Add On Call'},
        {val : 'daySpecOnCallDistReq', copy : 'On Call - District Req'},
        {val : 'daySpecPending', copy : 'One Pending Pickup'},
        {val : '4', copy : '**** Alternate Location ****'},
        {val : 'altDefault', copy : 'Default / With Ship Tip'},
        {val : 'alt2Large', copy : 'Too Large to Deliver'}
    ]

    shipNote:string = 'email';
    locationError:boolean = false;



    //Pickup Address CAC
    @ViewChild('NBSWhenView') pickupAddCAC;

    //Shippment Schedule
    @ViewChildren('whenSchedule') whenSchedule:QueryList<NBSScheduleComponent>;

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        this.nbsSpaSectionWhen = fb.group({
            "schedView" : ['0']
        });
        this.nbsBase = nbsProvider;
        //this.nbsBase.setNbsInSinglePg(true);
        if(this.defaultHold) {
            this.whenHoldLocSwitch = false;
        }
    }
    ngAfterViewInit(){
        /*this.whenSchedule.changes.subscribe((val) => {
            this.whenSchedComm = val.first;
        });*/
    }

    nbsFormSubmit():void {
        //console.log(this.nbsDetailsOptions.controls['notifyProblemEmailAddress']);

    }

    nbsFormValid():boolean {
        return true;
    }

    /**
     * @author wdriver / abrown
     * @returns ???
     * @description
     * ????????????????
     */
    nbsFormErrors():InbsFormErrors[] {
        return
    }

    /**
     * @name whenFalsify
     * @argument null
     * @author wdriver
     * @returns void
     * @description
     * switch all non-review properties in the When section to false, radios to 0, and switches to unchecked.
     * This is meant to be used in the When Demo button functions.
     * Call this function then toggle any property that needs to be displayed to true.
     */
    whenFalsify(){

        this.accessPoint = false;
        this.whenShipmentEntrance = '0';
        //Contnet in whenShipmentEntrance option NO
        this.whenDropoffnAvailable = false;
        this.whenDropoffCal = false;
        this.whenDropoffInfo = false;
        //Contnet in whenShipmentEntrance option YES
        this.whenDepricated = false,
        this.whenHold4Pkup = false;
        this.whenPkupOptions = false;
        this.whenSmartYesHeader = false;
        this.whenPickupAvailable = false;
        this.whenEditAdd = false;
        this.whenEditPkupDetails = false;
        this.whenLiftgateContent = false;
        this.whenPickupDateContent = false;
        this.whenSmartPickupShipTip = false;
        this.whenShipTip1 = false;
        this.whenSmartPickupTooLateShipTip = false;
        this.whenpkupAddContent = false;
        this.district = false;
        this.whenPkupDetailsContent = false;
        this.whenOnCallContent = false;
        this.whenPendingOnCallPickups = false;
        this.whenPkupOtherAvailableContent = false;
        this.whenPkupLocationContent = false;
        this.whenLike2DoContent = false;
        this.whenPendingPickup = false;
        this.whenScheduleOnCall = false;
        this.whenSmartPickupToday = false;
        this.whenSmartPickupTomorrow = false;
        this.smartRequest = false;
        this.whenIncludeSmartPickup = false;
        this.whenPendingOnCall = false;
        this.whenPendingOnCall = false;
        this.whenDaily = false;
        this.whenSmart = false;


        this.whenShipmentDelivery = '0';
        //Contnet in whenShipmentDelivery option NO
        this.whenNoDeliverHasContent = false;
        this.whenLoadingDockContent = false;
        this.whenDeliveryAvailable = true;
        this.toHeavyShipTip = false;
        //Contnet in whenShipmentDelivery option YES
        // this.whenSelectByLocation = false;
        this.whenHoldAtLocation = false;
        this.whenHoldLocName = false;
        this.whenHoldHours = false;

        this.whenHoldLocSwitch = true;
    }

    /**
     * @name whenReviewFalsify
     * @argument null
     * @author wdriver
     * @returns void
     * @description
     * switch all review properties in the When section to false, radios to 0, and switches to unchecked.
     * This is meant to be used in the When Demo button functions.
     * Call this function then toggle any any review property that needs to be displayed to true.
     */
    whenReviewFalsify(){
        this.whenReviewPickupYes = false;
        this.whenReviewPickupYesSmart = false;
        this.whenReviewPickupNo = false;
    }

    /**
     * @name whenReviewPickupYesBtn
     * @argument null
     * @author wdriver
     * @returns void
     * @description
     * toogles display to match when user wants to see Pickup > Review > Yes.
     */
    whenReviewPickupYesBtn(){
        console.log("You are in: whenReviewPickupYesBtn()");
        this.whenReviewFalsify();
        this.whenReviewPickupYes = true;
    }

    /**
     * @name whenReviewPickupYesSmartBtn
     * @argument null
     * @author wdriver
     * @returns void
     * @description
     * toogles display to match when user wants to see Pickup > Review > Yes (Smart).
     */
    whenReviewPickupYesSmartBtn(){
        console.log("You are in: whenReviewPickupYesSmartBtn()");
        this.whenReviewFalsify();
        this.whenReviewPickupYesSmart = true;
    }

    /**
     * @name whenReviewPickupNoBtn
     * @argument null
     * @author wdriver
     * @returns void
     * @description
     * toogles display to match when user wants to see Pickup > Review > No.
     */
    whenReviewPickupNoBtn(){
        console.log("You are in: whenReviewPickupNoBtn()");
        this.whenReviewFalsify();
        this.whenReviewPickupNo = true;
    }

    /**
     * @name whenSchecListViewBtn
     * @argument view
     * @author wdriver
     * @returns
     * @description
     * toogles display of radio list or grid view of the Shipping schedule
     */
    whenSchecListViewBtn(view){
        this.whenReviewFalsify();

        if (!(this.whenSchedule.length > 0)) {
            return;
        }

        if(view == 'list'){
            this.whenSchedule.first.setSchedView(true);
            return;
        }

        this.whenSchedule.first.setSchedView(false);
    }

    getWhenSchecListViewBtn(){
        if (!(this.whenSchedule.length > 0)) {
            return false;
        }
        
        return this.whenSchedule.first.getSchedView();
    }

    /**
     * @name whenReviewRecieverBtn
     * @argument view
     * @author wdriver
     * @returns
     * @description
     * toogles Yes or No delivery state
     */
    whenReviewRecieverBtn(maybe:string){
        // console.log(view);
        if(maybe == 'yes'){
            this.whenReviewReciever = true;
            return;
        }
        this.whenReviewReciever = false;
    }

    demoHold4Pickup(choice:string) {
        switch(choice){
            case 'open' :
                this.whenHoldLocSwitch = !this.whenHoldLocSwitch;
                this.defaultHold = false;
                this.locationError = false;
                break;
            case 'notFound' :
                this.locationError = !this.locationError;
                this.whenHoldLocSwitch = true;
                this.defaultHold = false;
                break;
            case 'outRadius' :
                this.defaultHold = !this.defaultHold;
                this.whenHoldLocSwitch = false;
                this.whenHldLocSwitchCol = false;
                this.locationError = false;
                break;
        }
    }

    demoBtn(): void {
        console.log(this.demoSelect);
        switch(this.demoSelect) {
            case 'defPicknAv':
                this.whenFalsify();
                this.whenDropoffCal = true;
                this.whenHoldAtLocation = true;
                break;
            case 'defAddPick':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenDropoffCal = true;
                this.whenPickupDateContent = true;
                this.whenpkupAddContent = true;
                this.whenPkupDetailsContent = true;

                this.whenHoldAtLocation = true;
                break;
            case 'defOnCall':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenDropoffCal = true;
                this.whenOnCallContent = true;
                this.whenLike2DoContent = true;
                this.whenPendingPickup = true;
                this.whenPendingOnCall = true;

                this.whenHoldAtLocation = true;
                break;
            case 'defAddPickOnCall':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenPickupDateContent = true;
                this.whenpkupAddContent = true;
                this.whenPkupDetailsContent = true;
                this.whenOnCallContent = true;
                this.whenLike2DoContent = true;
                this.whenPendingPickup = true;
                this.whenScheduleOnCall = true;

                this.whenHoldAtLocation = true;
                break;
            case 'defPickDaily':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenDropoffCal = true;
                this.whenPkupLocationContent = true;
                this.whenDaily = true;
                this.whenLike2DoContent = true;
                this.whenPendingPickup = true;
                this.whenScheduleOnCall = true;

                this.whenHoldAtLocation = true;
                break;
            case 'defPickDailyOnCall':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenDropoffCal = true;
                this.whenPkupLocationContent = true;
                this.whenDaily = true;
                this.whenLike2DoContent = true;
                this.whenPendingPickup = true;
                this.whenScheduleOnCall = true;
                this.whenPickupDateContent = true;
                this.whenpkupAddContent = true;
                this.whenPkupDetailsContent = true;

                this.whenHoldAtLocation = true;
                break;
            case 'defOther':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenDropoffCal = true;
                this.whenPkupLocationContent = true;
                this.whenDaily = true;
                this.whenLike2DoContent = true;
                this.whenPendingPickup = true;
                this.whenScheduleOnCall = true;
                this.whenPkupOtherAvailableContent = true;

                this.whenHoldAtLocation = true;
                break;
            case 'wwefDel':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenDropoffnAvailable = true;
                this.whenLiftgateContent = true;
                this.whenPickupDateContent = true;
                this.whenpkupAddContent = true;
                this.whenPkupDetailsContent = true;

                this.whenNoDeliverHasContent = true;
                this.whenLoadingDockContent = true;
                this.whenHoldLocName = true;
                this.whenHoldHours = true;
                break;
            case 'wwefHold':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenDropoffnAvailable = true;
                this.whenHold4Pkup = true;

                this.whenNoDeliverHasContent = true;
                this.whenLoadingDockContent = true;
                this.whenHoldLocName = true;
                this.whenHoldHours = true;
                break;
            case 'wwefDrop':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '0';
                this.whenDropoffCal = true;
                this.whenDropoffInfo = true;

                this.whenNoDeliverHasContent = true;
                this.whenLoadingDockContent = true;
                this.whenHoldLocName = true;
                this.whenHoldHours = true;
                break;
            case 'wwefDropAv':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '0';
                this.whenDropoffnAvailable = true;
                this.whenHold4Pkup = true;

                this.whenNoDeliverHasContent = true;
                this.whenLoadingDockContent = true;
                this.whenHoldLocName = true;
                this.whenHoldHours = true;
                break;
            case 'wwef2Heavy':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenDropoffnAvailable = true;
                this.whenHold4Pkup = true;

                this.whenNoDeliverHasContent = true;
                this.whenLoadingDockContent = true;
                this.whenHoldLocName = true;
                this.whenHoldHours = true;
                break;
            case 'smartInclude':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenSmartYesHeader = true;
                this.whenPkupLocationContent = true;
                this.whenSmart = true;
                this.whenLike2DoContent = true;
                this.whenSmartPickupToday = true;
                this.whenSmartPickupTomorrow = true;
                this.whenIncludeSmartPickup = true;

                this.whenHoldAtLocation = true;
                break;
            case 'smartPend':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenPkupLocationContent = true;
                this.whenPendingOnCallPickups = true;
                this.whenSmart = true;
                this.whenLike2DoContent = true;
                this.whenSmartPickupToday = true;
                this.smartRequest = true;
                this.whenIncludeSmartPickup = true;
                this.whenPendingOnCall = true;
                this.whenPendingOnCall = true;

                this.whenHoldAtLocation = true;
                break;
            case 'smartOnCall':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenSmartYesHeader = true;
                this.whenPkupLocationContent = true;
                this.whenPendingOnCallPickups = true;
                this.whenSmart = true;
                this.whenLike2DoContent = true;
                this.whenSmartPickupToday = true;
                this.whenSmartPickupTomorrow = true;
                this.whenIncludeSmartPickup = true;
                this.whenPendingOnCall = true;
                this.whenPendingOnCall = true;

                this.whenHoldAtLocation = true;
                break;
            case 'smartAddPickOnCall':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenSmart = true;
                this.whenSmartYesHeader = true;
                this.whenPkupLocationContent = true;
                this.whenLike2DoContent = true;
                this.whenSmartPickupToday = true;
                this.whenPendingOnCall = true;
                this.whenpkupAddContent = true;
                this.whenPkupDetailsContent = true;

                this.whenHoldAtLocation = true;
                break;
            case 'smartPast':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenSmart = true;
                this.whenSmartYesHeader = true;
                this.whenPkupLocationContent = true;
                this.whenLike2DoContent = true;
                this.whenSmartPickupToday = true;
                this.whenSmartPickupTomorrow = true;
                this.whenPendingOnCall = true;
                this.whenSmartPickupShipTip = true;
                this.whenShipTip1 = true;

                this.whenHoldAtLocation = true;
                break;
            case 'smartReqTooLate':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenSmart = true;
                this.whenSmartYesHeader = true;
                this.whenPkupLocationContent = true;
                this.whenLike2DoContent = true;
                this.whenSmartPickupTomorrow = true;
                this.whenPendingOnCall = true;
                this.whenSmartPickupTooLateShipTip = true;
                this.whenShipTip1 = true;

                this.whenHoldAtLocation = true;
                break;
            case 'smartTooLate':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenSmart = true;
                this.whenPkupLocationContent = true;
                this.whenLike2DoContent = true;
                this.whenSmartPickupTomorrow = true;
                this.whenPendingOnCall = true;
                this.whenSmartPickupTooLateShipTip = true;
                this.whenShipTip1 = true;

                this.whenHoldAtLocation = true;
                break;
            case 'smartNotReq':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                // this.whenSmartYesHeader = true;
                this.whenPkupLocationContent = true;
                // this.whenPendingOnCallPickups = true;
                this.whenSmart = true;
                this.whenLike2DoContent = true;
                this.whenSmartPickupToday = true;
                this.whenSmartPickupTomorrow = true;
                this.whenPendingOnCall = true;
                this.whenPendingOnCall = true;
                this.smartRequest = true;

                this.whenHoldAtLocation = true;
                break;
            case 'smartAccount':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenPkupLocationContent = true;
                this.whenSmart = true;
                this.whenLike2DoContent = true;
                this.whenSmartPickupToday = true;
                // this.whenSmartPickupTomorrow = true;
                this.whenPendingOnCall = true;
                this.whenPendingOnCall = true;
                this.whenPkupOtherAvailableContent = true;

                this.smartRequest = true;

                this.whenHoldAtLocation = true;
                break;
            case 'daySpecOnCall':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenPkupLocationContent = true;
                this.whenDaily = true;
                this.whenLike2DoContent = true;
                this.whenPickupDateContent = true;
                this.whenpkupAddContent = true;
                this.whenPkupDetailsContent = true;

                this.whenHoldAtLocation = true;
                break;
            case 'daySpecOnCallDistReq' :
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.district = true;
                this.whenPickupDateContent = true;
                this.whenpkupAddContent = true;
                this.whenPkupDetailsContent = true;

                this.whenHoldAtLocation = true;
                break;
            case 'daySpecPending':
                this.whenFalsify();
                this.whenPickupAvailable = true;
                this.whenShipmentEntrance = '1';
                this.whenPkupLocationContent = true;
                this.whenDaily = true;
                this.whenLike2DoContent = true;
                this.whenPendingPickup = true;
                this.whenScheduleOnCall = true;

                this.whenHoldAtLocation = true;
                break;
            case 'altDefault':
                this.whenFalsify();
                this.whenDropoffCal = true;
                this.whenHoldAtLocation = true;
                break;
            case 'alt2Large':
                this.whenFalsify();
                this.whenShipmentDelivery = '0';
                this.whenDropoffCal = true;
                this.whenDeliveryAvailable = false;
                this.toHeavyShipTip = true;
                break;
            case 'accessEmail':
                this.whenFalsify();
                this.accessPoint = true;
                this.accessSMS = false;
                this.accessEmail = true;
                break;
            case 'accessSMS':
                this.whenFalsify();
                this.accessPoint = true;
                this.accessEmail = false;
                this.accessSMS = true;
                break;
            default:
                console.log("You fell through your switch");
        }
    }

    /**
     * @name whenToggleAccessPoint
     * @argument view 
     * @author Hament Aggarwal
     * @returns void
     * @description
     * togles display between Access point and Access point review.
     */
    whenToggleAccessPoint(view:string){
        if(view==='review'){
            this.accessPoint=false;
            this.accessPointReview=true;
        }else{
            this.accessPoint = true;
            this.accessPointReview = false;
        }
    }
}
