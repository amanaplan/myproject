import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/forms_wizard/formsWizStep2_2.tpl.html',
})

export class FormsWizStep2_2Component implements OnInit {

    /*properties*/
    nbsBase:nbsComp;
    formsWizStep2_2:FormGroup; //formGroup object
    nafta_co_switch:boolean = true;
    nafta_co_acknol:boolean = true;
    formsWizStep2_2ShipTip:boolean = false;

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        console.log("The formsWizStep2_2 has loaded.");
        this.nbsBase = nbsProvider;
        this.formsWizStep2_2 = fb.group({})
    }

    ngOnInit() {
        //this.
    }

    /**
     * @name wizStep2_2Falsify
     * @argument null
     * @author wdriver
     * @returns void
     * @description
     * turn all booleen to false
     */
    wizStep2_2Falsify(){
    }
}
