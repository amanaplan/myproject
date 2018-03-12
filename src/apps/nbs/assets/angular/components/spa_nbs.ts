import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';

import { UpsDrawerList } from '../../../../../common/apps/assets/angular/drawer_list';

import { UpsInfoBtn } from '../../../../../common/apps/assets/angular/info_btn';

import { NBSWhereFromComponent } from './whereFrom_component';
import { NBSWhereToComponent } from './whereTo_component';
import { NBSWhatComponent } from './what_component';
import { NBSWhenComponent } from './when_component';
import { NBSIntFormsComponent } from './internationalForms_component';
import { NBSDetailsComponent } from './details_component';
import { NBSPaymentComponent } from './payment_component';

import { nbsComp } from '../services/nbs_comp';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/nbs_spa.tpl.html',
    providers : [ BrowserWindow, ViewPorts,
                    NBSWhereFromComponent,
                    NBSWhereToComponent,
                    NBSWhatComponent,
                    NBSWhenComponent,
                    NBSIntFormsComponent,
                    NBSDetailsComponent,
                    NBSPaymentComponent]
})

export class CompactViewComponent implements OnInit {

    /*properties*/
    //Global Var
    vpSize:vp;
    nbsBase:nbsComp;
    nbsSpaForm:FormGroup; //formGroup object for NBS spa
    nbsSpaFormSubmitAttempt:boolean = false;
    completedWhereFrom:boolean = false;
    completedWhereTo:boolean = false;
    completedWhat:boolean = false;
    completedWhatMultiPack:boolean = false;
    completedHow:boolean = false;

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

    @ViewChild(UpsDrawerList) UpsDrawerList;
    @ViewChild(UpsInfoBtn) UpsInfoBtn;

    @ViewChild('switchViewInfoContainer') switchViewInfoContainer;

    constructor (private viewport:ViewPorts, private fb:FormBuilder, private nbsProvider:nbsComp) {
        this.nbsBase = nbsProvider;
        viewport.viewPortChange().subscribe((val) => {
            this.vpSize = val;
        });
        this.nbsBase.setNbsInSinglePg(true);
    }

    ngOnInit() {
        //this.
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
    nbsSpaFormSubmit(){

        //this.nbsSpaFormSubmitAttempt = true;

        /*this.nbsSpaSectionWhereFromReturn();
        this.nbsSpaSectionWhereTo();
        this.nbsSpaSectionWhat();*/

        this.nbsBase.nbsGlobalFormSubmit = true;
        this.whereFrom.nbsFormSubmit();
        this.whereTo.nbsFormSubmit();
        this.what.nbsFormSubmit();
        this.when.nbsFormSubmit();
        this.addons.nbsFormSubmit();
        this.payment.nbsFormSubmit();

        //if(!this.nbsSpaForm.valid){
            return false;
        //}
    }

    nbsSpaSectionHasError():boolean {
        if (this.whereFrom.nbsFormValid() && this.whereTo.nbsFormValid()
            && this.what.nbsFormValid()) {
            return false;
        }

        return true;
    }

    /**
     * @name nbsSpaSectionWhereFromReturn
     * @argument null
     * @author wdriver /abrown
     * @returns void
     * @description
     * set inputs in Where To section markAsTouched()
     */
    /*nbsSpaSectionWhereFromReturn() {
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
    }*/

    /**
     * @name nbsSpaSectionWhereTo
     * @argument null
     * @author wdriver /abrown
     * @returns void
     * @description
     * set inputs in Where To section markAsTouched()
     */
    /*nbsSpaSectionWhereTo() {
        this.nbsSpaForm.get('nbsSpaSectionWhereTo.toName').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereTo.toStreetAddress').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereTo.toCity').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereTo.toStateDropdown').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhereTo.toZip').markAsTouched();
        this.nbsSpaForm.get('nbsSpaSectionWhat.whatWeight').markAsTouched();
    }*/

    /**
     * @name nbsSpaSectionWhat
     * @argument null
     * @author wdriver /abrown
     * @returns void
     * @description
     * set inputs in What section markAsTouched()
     */
    /*nbsSpaSectionWhat() {
        this.nbsSpaForm.get('nbsSpaSectionWhat.whatWeight').markAsTouched();
    }*/

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
