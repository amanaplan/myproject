import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';

declare var $:any;

@Component({
    selector: 'ups-step232no',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/forms_wizard/formsWizStep2_3_2no.tpl.html',
})

export class FormsWizStep2_3_2no_Component implements OnInit {

    /*properties*/
    nbsBase:nbsComp;

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        console.log("The formsWizStep2_3_2no has loaded.");
        this.nbsBase = nbsProvider;
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
    }
}
