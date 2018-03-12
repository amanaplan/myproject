import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/forms_wizard/formsWizStep2_5.tpl.html',
})

export class FormsWizStep2_5Component implements OnInit {

    /*properties*/
    nbsBase:nbsComp;
    formsWizStep2_5:FormGroup; //formGroup object
    //hmcFileEEI: string = "0";
    co_exemption_help:boolean = false;


    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        console.log("The formsWizStep2_5 has loaded.");
        console.log(this.formsWizStep2_5);
        this.nbsBase = nbsProvider;
        this.formsWizStep2_5 = fb.group({
            'hmcFileEEI' : ['', Validators.required],
            'hmc_itn_lever_yes' : ['', Validators.required],
            'hmc_eei_shipment_ref_number' : ['', Validators.required],
            'hmc_eei_email' : ['', Validators.required],
            'hmc_int_num' : ['', Validators.required],
            'hmc_file_eei_exemption_code' : ['', Validators.required],
            'hmc_file_eei_ultimate_recipient' : ['', Validators.required],
            'hmc_ultimate_country' : ['',Validators.required],
            'hmc_ultimate_name' : ['',Validators.required],
            'hmc_ultimate_address1' : ['',Validators.required],
            'hmc_ultimate_city' : ['',Validators.required],
            'hmc_ultimate_state' : ['',Validators.required],
            'hmc_ultimate_zip' : ['',Validators.required],
            'hmc_ultimate_email' : ['',Validators.required]
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
    wizStep2_5Falsify(){
    }

    formSubmit() {
        this.nbsBase.nbsGlobalFormSubmit = true;

        this.formsWizStep2_5.get('hmcFileEEI').markAsTouched();
        this.formsWizStep2_5.get('hmc_eei_shipment_ref_number').markAsTouched();
        this.formsWizStep2_5.get('hmc_eei_email').markAsTouched();
        this.formsWizStep2_5.get('hmc_int_num').markAsTouched();
        this.formsWizStep2_5.get('hmc_file_eei_exemption_code').markAsTouched();
        this.formsWizStep2_5.get('hmc_file_eei_ultimate_recipient').markAsTouched();
        this.formsWizStep2_5.get('hmc_ultimate_country').markAsTouched();
        this.formsWizStep2_5.get('hmc_ultimate_name').markAsTouched();
        this.formsWizStep2_5.get('hmc_ultimate_city').markAsTouched();
        this.formsWizStep2_5.get('hmc_ultimate_state').markAsTouched();
        this.formsWizStep2_5.get('hmc_ultimate_zip').markAsTouched();
        this.formsWizStep2_5.get('hmc_ultimate_email').markAsTouched();
        this.formsWizStep2_5.get('hmc_ultimate_address1').markAsTouched();
        //this.formsWizStep2_5.get('hmcFileEEI')
    }



    nbsFormValid() {

        if (this.formsWizStep2_5.get('hmcFileEEI').invalid) {
            return false;
        }

        if (this.formsWizStep2_5.get('hmc_eei_shipment_ref_number').invalid) {
            return false;
        }

        if (this.formsWizStep2_5.get('hmc_eei_email').invalid) {
            return false;
        }

        if (this.formsWizStep2_5.get('hmc_int_num').invalid) {
            return false;
        }

        if (this.formsWizStep2_5.get('hmc_file_eei_exemption_code').invalid) {
            return false;
        }

        if (this.formsWizStep2_5.get('hmc_file_eei_ultimate_recipient').invalid) {
            return false;
        }

        if (this.formsWizStep2_5.get('hmc_ultimate_country').invalid) {
            return false;
        }

        if (this.formsWizStep2_5.get('hmc_ultimate_name').invalid) {
            return false;
        }

        if (this.formsWizStep2_5.get('hmc_ultimate_address1').invalid) {
            return false;
        }

        if (this.formsWizStep2_5.get('hmc_ultimate_city').invalid) {
            return false;
        }

        if (this.formsWizStep2_5.get('hmc_ultimate_state').invalid) {
            return false;
        }

        if (this.formsWizStep2_5.get('hmc_ultimate_zip').invalid) {
            return false;
        }

        if (this.formsWizStep2_5.get('hmc_ultimate_email').invalid) {
            return false;
        }

        return true;
    }
}
