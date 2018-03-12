import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/forms_wizard/formsWizStep2_4.tpl.html',
})

export class FormsWizStep2_4Component implements OnInit {

    /*properties*/
    nbsBase:nbsComp;
    formsWizStep2_4:FormGroup; //formGroup object
    default:boolean = true;
    hmc_tariff:boolean = false;
    hmc_tariff_code:string = '0';
    tarWiz: boolean = false;
    accordion: boolean = false;
    hmc_number:string = "";

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        console.log("The formsWizStep2_4 has loaded.");
        this.nbsBase = nbsProvider;
        this.formsWizStep2_4 = fb.group({
            "hmc_tariff_code" : ""
        })
    }

    /**
     * @author wdriver
     * @return void
     * @param string
     * @description
     * toggles the elements in the DOM to display the various states of the payment section.
     */
    demoBtn(choice : string):void {
        switch(choice){
            case 'default':
                this.default = true;
                this.tarWiz = false;
                this.accordion = false;
                break;
            case 'hmc_single':
                this.default = false; 
                this.hmc_tariff = false;
                this.tarWiz = false;
                this.accordion = false;
                break;
            case 'tarWiz':
                this.default = false; 
                this.hmc_tariff = false;
                this.tarWiz = true;
                this.accordion = true;
                this.hmc_tariff_code = 'oma';
                break;
            default:
                console.log("You have fallen through the payDemoBtn() switch");
        }
    }

    /**
     * @author wdriver
     * @return void
     * @description
     * When a user changes the selection in "Select a product category" This function checks if the select value and changes the value of "Enter Harmonized Tariff Code Number" accordingly.
     */
    hmc_tariff_code_change():void {
        if(this.hmc_tariff_code == 'tAndG'){
            this.hmc_number = '95';
        }
        
        if(this.hmc_tariff_code == 'aAndA'){
            this.hmc_number = '62.01.13.10';
        }
    }

    ngOnInit() {
        //this.
    }
}
