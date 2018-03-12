import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../services/nbs_comp';
import { INBS } from '../../interfaces/inbs';
import { Subject, Observable } from 'rxjs';
import { IFormErrors } from '../../../../../../common/apps/assets/angular/form_error.interface';

declare var $: any;

@Component({
    selector: 'ups-coreForm',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/core_form.tpl.html'
})

export class CoreFormComponent implements AfterViewInit {

    /*properties*/
    nbsBase: nbsComp;
    coreFormFormGroup: FormGroup; //formGroup object
    coreForm = {
        'prodSaved' : '0',
        'uOfM' : '0',
        'currency' : '1',
        'origin' : '0'
    };

    field_names = {
        'poNum' : 'Description',
        'uOfM' : 'Unit of Measure',
        'prodUnit' : 'Units',
        'prodVal' : 'Unit Value',
        'currency' : 'Currency',
        'origin' : 'Country or Territory of Origin'
    };

    fieldDomId = {
        'poNum' : 'ups-poNum',
        'uOfM' : 'ups-uOfM',
        'prodUnit' : 'ups-prodUnit',
        'prodVal' : 'ups-prodVal',
        'currency' : 'ups-currency',
        'origin' : 'ups-origin'
    };

    constructor(private fb: FormBuilder, nbsProvider: nbsComp) {
        console.log("The CoreFormComponent has loaded.");
        this.nbsBase = nbsProvider;
        this.coreFormFormGroup = fb.group({
            "poNum" : ['', Validators.required],
            "uOfM" : ['0', Validators.required],
            "prodUnit" : ['', Validators.required],
            "prodVal" : ['', Validators.required],
            "currency" : ['1', Validators.required],
            "origin" : ['0', Validators.required]
        })

    }

    ngAfterViewInit(): void {
    }

    nbsFormValid():boolean {
        return !(this.coreFormFormGroup.controls['poNum'].hasError('required'),
                this.coreFormFormGroup.controls['prodUnit'].hasError('required'),
                this.coreFormFormGroup.controls['prodVal'].hasError('required'),
                this.coreForm.uOfM == '0',
                this.coreForm.currency == '0',
                this.coreForm.origin == '0');
    }

    setTouched():void {
        this.coreFormFormGroup.controls['poNum'].markAsTouched();
        this.coreFormFormGroup.controls['uOfM'].markAsTouched();
        this.coreFormFormGroup.controls['prodUnit'].markAsTouched();
        this.coreFormFormGroup.controls['prodVal'].markAsTouched();
        this.coreFormFormGroup.controls['currency'].markAsTouched();
        this.coreFormFormGroup.controls['origin'].markAsTouched();
    }
    
    setUntouched():void {
        this.coreFormFormGroup.controls['poNum'].markAsUntouched();
        this.coreFormFormGroup.controls['uOfM'].markAsUntouched();
        this.coreFormFormGroup.controls['prodUnit'].markAsUntouched();
        this.coreFormFormGroup.controls['prodVal'].markAsUntouched();
        this.coreFormFormGroup.controls['currency'].markAsUntouched();
        this.coreFormFormGroup.controls['origin'].markAsUntouched();
    }

    coreFormError():IFormErrors[] {
        let error_object:IFormErrors[] = [];

        for (let i in this.coreFormFormGroup.controls) {
            if (this.coreFormFormGroup.controls[i].errors) {
                let errReq = (this.coreFormFormGroup.controls[i].errors.required) ? true : false;
                let errPat = (this.coreFormFormGroup.controls[i].errors.pattern) ? true : false;

                error_object.push({
                    'field_id' : i,
                    'field_name' : this.field_names[i],
                    'field_req' : errReq,
                    'field_pattern' : errPat,
                    'field_dom_id' : this.fieldDomId[i]
                });
            }

        }

        if(this.coreForm.uOfM == '0'){
            // var i = this.coreFormFormGroup.controls[1];
            error_object.push({
                'field_id' : 'uOfM',
                'field_name' : this.field_names['uOfM'],
                'field_req' : true,
                'field_pattern' : false,
                'field_dom_id' : this.fieldDomId['uOfM']
            });
        }
        
        if(this.coreForm.currency == '0'){
            // var i = this.coreFormFormGroup.controls[1];
            error_object.push({
                'field_id' : 'currency',
                'field_name' : this.field_names['currency'],
                'field_req' : true,
                'field_pattern' : false,
                'field_dom_id' : this.fieldDomId['currency']
            });
        }

        if(this.coreForm.origin == '0'){
            // var i = this.coreFormFormGroup.controls[1];
            error_object.push({
                'field_id' : 'origin',
                'field_name' : this.field_names['origin'],
                'field_req' : true,
                'field_pattern' : false,
                'field_dom_id' : this.fieldDomId['origin']
            });
        }

        return error_object;
    }

}
