import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';
import { Subject, Observable } from 'rxjs';
import { UPSCACComponent } from '../../../../../../../common/apps/assets/angular/cac';
import { CoreFormComponent } from '../coreForm_component';


declare var $: any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/commercial_invoice/ci_modal.tpl.html',
})

export class CommercialInvoiceComponent implements AfterViewInit {

    /*properties*/ 
    dEvent = new Subject();
    nbsBase: nbsComp;
    ciFormGroup: FormGroup; //formGroup object
    ready: boolean = false;
    inProg: boolean = false;
    reviewAddress = [
        {groupValue : 'Tax ID/Vat No.:[]'},
        {groupValue : '[Company Name]'},
        {groupValue : '[Contact Name]'},
        {groupValue : '[Street Adress]'},
        {groupValue : '[Address 2]'},
        {groupValue : '[Address 3]'},
        {groupValue : '[City], [State], [Zip]'},
        {groupValue : '[Country or Territory]'},
        {groupValue : '[Email]'},
        {groupValue : '[Phone]'},
    ]

    @ViewChildren ('coreForm') coreForm: QueryList <CoreFormComponent>;
    @ViewChildren ('ComInvoiceCAC') comInvoiceCAC;

    constructor(private fb: FormBuilder, nbsProvider: nbsComp) {
        console.log("The Packing list has loaded.");
        this.nbsBase = nbsProvider;

        this.ciFormGroup = fb.group({
            "ups-ciSoldToEmail" :  ['', [Validators.required, Validators.email]],
            "ups-ciSoldToPhone" : ['', [Validators.required]],
            "ups-ciVatID" : ['', [Validators.required]]
        });

    }

    ngAfterViewInit(): void {
        //run method on page load if they exist
        this.updateCICac();

        this.comInvoiceCAC.changes.subscribe((val) => {
            this.updateCICac();
        });

        //run method on page load if they exist
        this.updateCoreForm();

        this.coreForm.changes.subscribe((val) => {
            this.updateCoreForm();
        });
    }

    updateCoreForm() {
        if (this.coreForm.length > 0) {

            if (this.nbsBase.nbsGlobalFormSubmit) {
                this.coreForm.first.setTouched();
            }
        }
    }

    updateCICac() {
        if (this.comInvoiceCAC.length > 0) {
            this.comInvoiceCAC.first.appendFormIDs('0');

            if (this.nbsBase.nbsGlobalFormSubmit) {
                this.comInvoiceCAC.first.setAllTouched();
            }
        }
    }

    

    closeEvent(): Observable<any> {
        // console.log(this.dEvent);
        this.nbsBase.nbsGlobalFormSubmit = false;
        this.coreForm.first.setUntouched();
        this.dEvent.next(true);
        return this.dEvent;
    }

    nbsFormValid():boolean {

        if (this.comInvoiceCAC && this.comInvoiceCAC.length > 0) {
            if (this.comInvoiceCAC.first.formErrors().length > 0) {
                return false;
            }
        }

        if (this.coreForm && this.coreForm.length > 0) {
            if (this.coreForm.first.coreFormError().length > 0) {
                return false;
            }
        }

        return true;
    }

    formSave() {
        this.nbsBase.nbsGlobalFormSubmit = true;
        this.coreForm.first.setTouched();
        this.coreForm.first.nbsFormValid(); //varify if the core form component validates 
        return true;
    }
}
