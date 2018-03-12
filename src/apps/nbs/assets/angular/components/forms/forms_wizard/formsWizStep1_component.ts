import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/forms_wizard/formsWizStep1.tpl.html',
})

export class FormsWizStep1Component implements AfterViewInit {

    /*properties*/
    nbsBase:nbsComp;
    formsWizStep1:FormGroup; //formGroup object
    guest:boolean = true;
    loggedIn:boolean = false;
    withSaved:boolean = false;
    unitType:boolean = false;
    numShipping:boolean = true;
    savedItemSelected:boolean = false;

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        console.log("The formsWizStep1 has loaded.");
        this.nbsBase = nbsProvider;
        this.formsWizStep1 = fb.group({
            "hmc_item_desc" : "",
            "hmc_product_packaged" : "",
            "hmc_item_num" : "",
            "hmc_item_type" : "",
            "hmc_item_worth" : "",
            "hmc_item_worth_currency" : "",
            "hmc_item_made" : ""
        })
    }

    ngAfterViewInit(): void {

        // console.log("sdkjfh");
        // this.modal1.open();
        // console.log(this.modal1.modalShown);
    }

    /**
     * @name wizStep1Falsify
     * @argument null
     * @author wdriver
     * @returns void
     * @description
     * turn all booleen to false
     */
    wizStep1Falsify(){
        this.guest = false;
        this.loggedIn = false;
        this.withSaved = false;
        this.unitType = false;
        this.numShipping = false;
        this.savedItemSelected = false;
    }

    /**
     * @name wizStep1ToggleDemo
     * @argument choice
     * @author wdriver
     * @returns void
     * @description
     * show/hide content based on the demo button clicked
     */
    wizStep1ToggleDemo(choice:string){
        console.log("wizStep1ToggleDemo()");
        switch(choice){
            case 'guest':
                console.log("wizStep1ToggleDemo() option guest");
                this.wizStep1Falsify();
                this.guest = true;
                this.numShipping = true;
                break;
            case 'logAddNew':
                console.log("wizStep1ToggleDemo() option logAddNew");
                this.wizStep1Falsify();
                this.loggedIn = true;
                this.numShipping = true;
                break;
            case 'logSavSel':
                console.log("wizStep1ToggleDemo() option logSavSel");
                this.guest = false;
                this.loggedIn = true;
                this.withSaved = false;
                this.unitType = true;
                this.numShipping = true;
                this.savedItemSelected = true;
                break;
            default:
                this.wizStep1Falsify();
                console.log("ran through wizStep1ToggleDemo() switch.  There has been an error.");
        }
    }
}
