import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/forms_wizard/formsWizStep2_7.tpl.html',
})

export class FormsWizStep2_7Component implements OnInit {

    /*properties*/
    nbsBase:nbsComp;
    formsWizStep2_7:FormGroup; //formGroup object
    licType:string = '0';
    exportInfo:string = '0';

    shipTipItems = [
        {copy : 'Nuclear materials equipment and miscellaneous components'},
        {copy : 'Materials related to chemicals, microorganisms, and toxins'},
        {copy : 'Materials processing'},
        {copy : 'Electronics'},
        {copy : 'Computers'},
        {copy : 'Telecommunications and information security'},
        {copy : 'Sensors and lasers'},
        {copy : 'Navigation and avionics'},
        {copy : 'Marine equipment and accessories'},
        {copy : 'Propulsion systems, space vehicles and related equipment'}
    ]
    

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        console.log("The FormsWizStep2_7Component has loaded.");
        console.log(this.formsWizStep2_7);
        this.nbsBase = nbsProvider;
        this.formsWizStep2_7 = fb.group({
            'schedB' : ['', Validators.required],
            'grossWeight' : ['', Validators.required],
            'licType' : ['0', Validators.required],
            'exportInfo' : ['0', Validators.required],
            'eccn' : ['', Validators.required],
            'expLicNum' : ['', Validators.required]
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
        this.formsWizStep2_7.get('schedB').markAsTouched();
        this.formsWizStep2_7.get('grossWeight').markAsTouched();
        this.formsWizStep2_7.get('licType').markAsTouched();
        this.formsWizStep2_7.get('exportInfo').markAsTouched();
        this.formsWizStep2_7.get('eccn').markAsTouched();
        this.formsWizStep2_7.get('expLicNum').markAsTouched();
    }
    
    nbsFormValid() { 
        
        if (this.formsWizStep2_7.get('schedB').invalid) {
            return false;
        }
        
        if (this.formsWizStep2_7.get('grossWeight').invalid) {
            return false;
        }
        
        if (this.formsWizStep2_7.get('licType').invalid) {
            return false;
        }
        
        if (this.formsWizStep2_7.get('exportInfo').invalid) {
            return false;
        }
        
        if (this.formsWizStep2_7.get('eccn').invalid) {
            return false;
        }
        
        if (this.formsWizStep2_7.get('expLicNum').invalid) {
            return false;
        }
        
        return true; 
    }
}
