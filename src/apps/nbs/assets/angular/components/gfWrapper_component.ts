import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';

import { GFModalComponent } from './gfModal_component';

import { UpsInfoBtn } from '../../../../../common/apps/assets/angular/info_btn';

import { NBSWhereFromComponent } from './whereFrom_component';
import { NBSWhereToComponent } from './whereTo_component';
import { NBSWhatComponent } from './what_component';
import { NBSWhenComponent } from './when_component';
import { NBSIntFormsComponent } from './internationalForms_component';
import { NBSDetailsComponent } from './details_component';
import { NBSPaymentComponent } from './payment_component';

import { nbsComp } from '../services/nbs_comp';
import { INBS } from '../interfaces/inbs';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/gf_wrapper.tpl.html',
    providers : [ BrowserWindow, ViewPorts,
                    NBSWhereFromComponent,
                    NBSWhereToComponent,
                    NBSWhatComponent,
                    NBSWhenComponent,
                    NBSIntFormsComponent,
                    NBSDetailsComponent,
                    NBSPaymentComponent]
})

export class GFNBSComponent implements OnInit {

    /*properties*/
    nbsBase:nbsComp;
    vpSize:vp;
    nbsSpaForm:FormGroup; //formGroup object for NBS spa
    nbsSpaFormSubmitAttempt:boolean = false;
    backBtn:boolean = false;
    nextBtn:boolean = false;
    continueBtn:boolean = false;
    cancelBtn:boolean = false;
    saveShipmentBtn:boolean = false;
    whereFromSection:boolean = false;
    whereToSection:boolean = false;
    whatSection:boolean = false;
    whenSection:boolean = false;
    intFormsSection:boolean = false;
    detailsSection:boolean = false;
    formsSection:boolean = false;
    paymentSection:boolean = false;

    //Where From Section
    @ViewChild('NBSWhereFromView') whereFrom:NBSWhereFromComponent;

    //Where To Section
    @ViewChild('NBSWhereToView') whereTo:NBSWhereToComponent;

    //What Section
    @ViewChild('NBSWhatView') what:NBSWhatComponent;

    //When Section
    @ViewChild('NBSWhenView') when:NBSWhenComponent;

    //NBS Int Forms Section
    @ViewChild('NBSIntFormsView') intForms:NBSIntFormsComponent;

    //Details Section
    @ViewChild('NBSDetailsView') addons:NBSDetailsComponent;

    //Payment Section
    @ViewChild('NBSPaymentView') payment:NBSPaymentComponent;

    @ViewChild(UpsInfoBtn) UpsInfoBtn;

    @ViewChild('switchViewInfoContainer') switchViewInfoContainer;

    constructor (private viewport:ViewPorts, public _router: Router, private fb:FormBuilder, private nbsProvider:nbsComp) {
        this.nbsBase = nbsProvider;

        //makes sure variable is set when changing from Comact View to guided flow
        this.nbsBase.setNbsInSinglePg(false);


        viewport.viewPortChange().subscribe((val) => {
            this.vpSize = val;
        });
        _router.events.subscribe((val) => {
            switch(_router.url){
                case '/gfWrapper/whereFrom':
                    console.log("I am in from\n\n");
                    this.sectionFalsify();
                    this.whereFromSection = true;
                    this.continueBtn = true;
                    this.cancelBtn = true;
                    break;
                case '/gfWrapper/whereTo':
                    console.log("I am in to\n\n");
                    this.sectionFalsify();
                    this.whereToSection = true;
                    this.continueBtn = true;
                    this.cancelBtn = true;
                    break;
                case '/gfWrapper/what':
                    console.log("I am in what\n\n");
                    this.sectionFalsify();
                    this.whatSection = true;
                    this.backBtn = true;
                    this.nextBtn = true;
                    this.cancelBtn = true;
                    this.saveShipmentBtn = true;
                    break;
                case '/gfWrapper/when':
                    console.log("I am in when\n\n");
                    this.sectionFalsify();
                    this.whenSection = true;
                    this.backBtn = true;
                    this.nextBtn = true;
                    this.cancelBtn = true;
                    this.saveShipmentBtn = true;
                    // this.when.whenSchedule.whenSchecListView = false;
                    break;
                case '/gfWrapper/intForms':
                    console.log("I am in froms\n\n");
                    this.sectionFalsify();
                    this.intFormsSection = true;
                    this.detailsSection = true;
                    this.backBtn = true;
                    this.nextBtn = true;
                    this.cancelBtn = true;
                    this.saveShipmentBtn = true;
                    break;
                case '/gfWrapper/addons':
                    console.log("I am in addons\n\n");
                    this.sectionFalsify();
                    this.detailsSection = true;
                    this.backBtn = true;
                    this.nextBtn = true;
                    this.cancelBtn = true;
                    this.saveShipmentBtn = true;
                    break;
                case '/gfWrapper/payment':
                    console.log("I am in payment\n\n");
                    this.sectionFalsify();
                    this.paymentSection = true;
                    this.backBtn = true;
                    this.continueBtn = true;
                    this.cancelBtn = true;
                    this.saveShipmentBtn = true;
                    break;
                default:
                    console.log("The link is broken.\n\n");
            }
        });
    }

    ngOnInit() {
        //this.
    }

    /**
     * @name sectionFalsify
     * @argument null
     * @author wdriver
     * @returns void
     * @description
     * toggle all section components to false.
     */
    sectionFalsify(){
        this.whereFromSection = false;
        this.whereToSection = false;
        this.whatSection = false;
        this.whenSection = false;
        this.intFormsSection = false;
        this.detailsSection = false;
        this.formsSection = false;
        this.paymentSection = false;

        this.backBtn = false;
        this.nextBtn = false;
        this.continueBtn = false;
        this.cancelBtn = false;
        this.saveShipmentBtn = false;
    }

    /**
     * @name submitForm
     * @argument null
     * @author wdriver
     * @returns void
     * @description
     * vaidate form:
     * If validation fails show page/field level error messaging
     * If validation passes store form data for use on the back end
     */
    submitForm():void {
        console.log("The submit button was pressed");
    }

    /**
     * @name nbsSpaFormSubmit
     * @argument null
     * @author wdriver /abrown
     * @returns void
     * @description
     * vaidate on submit
     * Marks required fields as touched. Then checks each section of page to see if they have validated as true, i.e. no error.
     */
    nbsGFFormSubmit(){

        //this.nbsSpaFormSubmitAttempt = true;

        /*this.nbsSpaSectionWhereFromReturn();
        this.nbsSpaSectionWhereTo();
        this.nbsSpaSectionWhat();*/

        // this.nbsBase.nbsGlobalFormSubmit = true;
        if(this.whereFromSection = true){
            if(this.whereToSection = true){
                this.whereFrom.nbsFormSubmit();
                /** 
                 * Begin from Here
                 * @see: Fixed for JIRA UPSO-3971
                 * @author: Hament Aggarwal
                 * @description: setting WhereFromSection to false amd also commenting nbsSubmitForm for whereTo for following reason
                 * 1. It throws error when click on Continue button.
                 * 2. I believe WhereTo Form is not available on DOM due to which nbsFromSumit didn't work properly. 
                 * **/
                this.whereFromSection=false;
                //this.whereTo.nbsFormSubmit();
                /*Ends Here */
                this.cancelBtn = true;
                this.nbsBase.nbsGlobalFormSubmit = true;
            } else {
                this.whereToSection = true;
            }
        }else if(this.whereToSection = true){
            this.whereTo.nbsFormSubmit();
            this.cancelBtn = true;
            this.nbsBase.nbsGlobalFormSubmit = true;
        }else if(this.whatSection = true){this.what.nbsFormSubmit();
        }else if(this.whenSection = true){this.when.nbsFormSubmit();
        }else if(this.detailsSection = true){this.addons.nbsFormSubmit();
        }else if(this.paymentSection = true){this.payment.nbsFormSubmit();}

        //if(!this.nbsSpaForm.valid){
        //    return false;
        //}
    }

    /**
     * @name nbsSpaSectionWhereFromReturn
     * @argument null
     * @author wdriver /abrown
     * @returns void
     * @description
     * set inputs in Where To section markAsTouched()
     */
    nbsSpaSectionWhereFromReturn() {
        this.nbsSpaForm.get('nbsSpaSectionWhereFrom.fromName').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereFrom.fromStreetAddress').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereFrom.fromCity').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereFrom.fromStateDropdown').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereFrom.fromZip').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereFrom.fromEmail').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereFrom.fromPhone').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereFrom.returnName').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereFrom.returnStreetAddress').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereFrom.returnCity').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereFrom.returnStateDropdown').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereFrom.returnZip').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereFrom.returnEmail').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereFrom.returnPhone').markAsTouched();
    }

    /**
     * @name nbsSpaSectionWhereTo
     * @argument null
     * @author wdriver /abrown
     * @returns void
     * @description
     * set inputs in Where To section markAsTouched()
     */
    nbsSpaSectionWhereTo() {
        this.nbsSpaForm.get('nbsSpaSectionWhereTo.toName').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereTo.toStreetAddress').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereTo.toCity').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereTo.toStateDropdown').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereTo.toZip').markAsTouched();
    }

    /**
     * @name nbsSpaSectionWhat
     * @argument null
     * @author wdriver /abrown
     * @returns void
     * @description
     * set inputs in What section markAsTouched()
     */
    nbsSpaSectionWhat() {
        this.nbsSpaForm.get('nbsSpaSectionWhat.whatWeight').markAsTouched();
    }

    // /**
    //  * @name whatPackagingTypeChange
    //  * @argument null
    //  * @author wdriver /abrown
    //  * @returns void
    //  * @description
    //  * Change content in the What Section based on chosen value in Packing Type dropdown
    //  */
    // whatPackagingTypeChange(){
    //     console.log("I started");
    //     console.log(this.whatPackagingType);

    //     if (this.whatPackagingType == '3') {
    //         this.whatLWHPrepop = true;

    //     }else{
    //         this.whatLWHPrepop = false;
    //     }
    //     console.log("I finished");
    // }

 }
