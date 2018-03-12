import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';

import { FormsWizStep2_3_1_Component } from "./formsWizStep2_3_1_component";
import { FormsWizStep2_3_2yes_Component } from "./formsWizStep2_3_2yes_component";
import { FormsWizStep2_3_2no_Component } from "./formsWizStep2_3_2no_component";

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/forms_wizard/formsWizStep2_3_0.tpl.html',
})

export class FormsWizStep2_3_0_Component implements OnInit {
    step31: boolean = true;
    step32no: boolean = false;
    step32yes: boolean = false;

    /*properties*/
    nbsBase:nbsComp;
    formsWizStep2_3:FormGroup; //formGroup object

    @ViewChild('Step31Comp') step31Comp:FormsWizStep2_3_1_Component;
    
    @ViewChild('Step32yesComp') step32yesComp:FormsWizStep2_3_2yes_Component;
    
    @ViewChild('Step32noComp') step32noComp:FormsWizStep2_3_2no_Component;

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        console.log("The formsWizStep2_3_0 has loaded.");
        this.nbsBase = nbsProvider;
        this.formsWizStep2_3 = fb.group({}); // And this to all modals to get close btn to work
    }

    ngOnInit() {
        //this.
    }

    /**
     * @name step2_3BackBtn
     * @argument null
     * @author wdriver
     * @returns void
     * @description
     * move back to the previous question 
     * from step 2 to step 1.
     */
    step2_3BackBtn(){
        if(!this.step31){
            this.step32yes = false;
            this.step32no = false;
        }
        this.step31 = true;
    }

    /**
     * @name step2_3NextBtn
     * @argument null
     * @author wdriver
     * @returns void
     * @description
     * move forward to the next question
     * from step 1 to step 2.
     */
    step2_3NextBtn(){
        if(this.step31Comp.hmcMaterialsCAMXUSLever){
            this.step32no = true;
        }else{
            this.step32yes = true;
        }
        this.step31 = false;
    }
}
