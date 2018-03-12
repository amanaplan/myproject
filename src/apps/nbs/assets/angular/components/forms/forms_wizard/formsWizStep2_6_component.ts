import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/forms_wizard/formsWizStep2_6.tpl.html',
})

export class FormsWizStep2_6Component implements OnInit {

    /*properties*/
    nbsBase:nbsComp;
    formsWizStep2_6:FormGroup; //formGroup object
    

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        console.log("The formsWizStep2_6 has loaded.");
        console.log(this.formsWizStep2_6);
        this.nbsBase = nbsProvider;
        this.formsWizStep2_6 = fb.group({
            'usppiID' : ['', Validators.required],
            'typeID' : ['', Validators.required],
            'indond' : ['', Validators.required],
            'ftzID' : ['', Validators.required]
        })
    }

    ngOnInit() {
        //this.
    }

    /**
     * @name wizStep2_6Falsify
     * @argument null
     * @author wdriver
     * @returns void
     * @description
     * turn all booleen to false
     */
    wizStep2_6Falsify(){
    }

    formSubmit() {
        this.nbsBase.nbsGlobalFormSubmit = true;

        this.formsWizStep2_6.get('usppiID').markAsTouched();
        this.formsWizStep2_6.get('typeID').markAsTouched();
        this.formsWizStep2_6.get('indond').markAsTouched();
        this.formsWizStep2_6.get('ftzID').markAsTouched();
    }
    
    nbsFormValid() { 
        
        if (this.formsWizStep2_6.get('usppiID').invalid) {
            return false;
        }
        
        if (this.formsWizStep2_6.get('typeID').invalid) {
            return false;
        }
        
        if (this.formsWizStep2_6.get('indond').invalid) {
            return false;
        }
        
        if (this.formsWizStep2_6.get('ftzID').invalid) {
            return false;
        }
        
        return true; 
    }
}
