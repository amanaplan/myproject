import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/forms_wizard/formsWizStep3.tpl.html',
})

export class FormsWizStep3Component implements AfterViewInit {

    /*properties*/
    nbsBase:nbsComp;
    formsWizStep3:FormGroup; //formGroup object

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        console.log("The formsWizStep3 has loaded.");
        this.nbsBase = nbsProvider;
        this.formsWizStep3 = fb.group({})
    }

    ngAfterViewInit(): void {

        // console.log("sdkjfh");
        // this.modal1.open();
        // console.log(this.modal1.modalShown);
    }
}
