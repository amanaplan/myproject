/******************************************************************************
### DOCUMENTATION: (How to use this Component) ###

** Add this to your app.ts **
import { UPSCPCComponent } from '../../../../common/apps/assets/angular/cpc';

** Add the reference in your @NgModule **
@NgModule ({
    ...
    declarations: [
        ...
        UPSCPCComponent
    ]
});

** Angular Magic happens and you can use this component in your component **
<ups-cpc></ups-cpc>


## FEATURES ##
This component has a field visibility setting builtin. Add a viewchild to
access it.

<ups-cpc #uniqueid></ups-cpc>

@ViewChild('uniqueid') cpcComp;

cpcComp.setFieldVisibility({
    'cardHolderName' : false
});


*******************************************************************************/
import { Component, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UPSCACComponent } from './cac';
import { IFormErrors } from "./form_error.interface";

@Component({
    selector: 'ups-cpc',
    templateUrl: 'assets/resources/angular/common/templates/cpc.tpl.html'
})
export class UPSCPCComponent {
    field_names = {
        'cardType' : 'Card Type',
        'cardHolderName' : 'Cardholder Name',
        'cardHolderCard' : 'Card Number',
        'cardExpirationMonth' : 'Expiration Month',
        'cardExpirationYear' : 'Expiration Year',
        'cardCVV' : 'CVV',
        'vatIdEs' : 'VAT / NIF ID'
    }

    fieldDomId = {
        'cardType' : 'ups-cpc-card-type',
        'cardHolderName' : 'ups-cpc-card-name',
        'cardHolderCard' : 'ups-cpc-card-number',
        'cardExpirationMonth' : 'ups-cpc-card-month',
        'cardExpirationYear' : 'ups-cpc-card-year',
        'cardCVV' : 'ups-cpc-card-cvv',
        'vatIdEs' : 'ups-cpc-vatEs-id'
    }
    cardTypes = [
        {
            value : 'visa',
            name : 'Visa'
        },
        {
            value : 'mastercard',
            name : 'Mastercard'
        },
        {
            value : 'americanexpress',
            name : 'American Express'
        },
        {
            value : 'discover',
            name : 'Discover'
        },
        /*{
            value : 'paypal',
            name : 'Paypal'
        }*/
    ];

    months = [
        {
            monthNum : 1,
            monthName : 'January'
        },
        {
            monthNum : 2,
            monthName : 'February'
        },
        {
            monthNum : 3,
            monthName : 'March'
        },
        {
            monthNum : 4,
            monthName : 'April'
        },
        {
            monthNum : 5,
            monthName : 'May'
        },
        {
            monthNum : 6,
            monthName : 'June'
        },
        {
            monthNum : 7,
            monthName : 'July'
        },
        {
            monthNum : 8,
            monthName : 'August'
        },
        {
            monthNum : 9,
            monthName : 'September'
        },
        {
            monthNum : 10,
            monthName : 'October'
        },
        {
            monthNum : 11,
            monthName : 'November'
        },
        {
            monthNum : 12,
            monthName : 'December'
        }
    ];

    years = ['2017', '2018', '2019', '2020'];

    visibleCardType:boolean = true;
    visibleCardholderName:boolean = true;
    visibleVatIdPt:boolean = false;
    visibleVatIdEs:boolean = false;
    iin:string = 'vat';
    formTouched:boolean = false;

    cpcForm:FormGroup;

    @ViewChildren('cpcCtrlCAC') cpcCtrlCAC;

    constructor(private fb:FormBuilder) {
        this.cpcForm = fb.group({
            'cardType' : ['', Validators.required],
            'cardHolderName' : ['', Validators.required],
            'cardHolderCard' : ['', Validators.required],
            'cardExpirationMonth' : ['0', Validators.pattern('^[1-9][0-2]?$')],
            'cardExpirationYear' : ['0', Validators.pattern('^[1-9][0-9]+$')],
            'cardCVV' : ['', Validators.required],
            'vatIdEs' : ['', Validators.required]
        })
    }

    ngAfterViewInit() {
        this.updateCAC();

        this.cpcCtrlCAC.changes.subscribe((val) => {
            this.updateCAC();
        });
    }

    updateCAC() {
        if (this.cpcCtrlCAC.length > 0) {
            if (this.formTouched) {
                this.cpcCtrlCAC.first.setAllTouched();
            }

            this.cpcCtrlCAC.first.appendFormIDs('cac');

            /*if (this.nbsBase.nbsGlobalFormSubmit) {
                this.cpcComp.first.setAllTouched();
            }*/
        }
    }


    formErrors():IFormErrors[] {
        let error_object:IFormErrors[] = [];

        for (let i in this.cpcForm.controls) {
            if (this.cpcForm.controls[i].errors) {
                let errReq = (this.cpcForm.controls[i].errors.required) ? true : false;
                let errPat = (this.cpcForm.controls[i].errors.pattern) ? true : false;

                if (i == 'cardType' && !this.visibleCardType) {
                    continue;
                }

                if (i == 'cardHolderName' && !this.visibleCardholderName) {
                    continue;
                }
                
                if (i == 'vatIdEs' && !this.visibleVatIdEs) {
                    continue;
                }
                
                // if (i == 'vatIdPt' && !this.visibleVatIdPt) {
                //     continue;
                // }

                error_object.push({
                    'field_id' : i,
                    'field_name' : this.field_names[i],
                    'field_req' : errReq,
                    'field_pattern' : errPat,
                    'field_dom_id' : this.fieldDomId[i]
                });


            }

        }

        if (this.cpcCtrlCAC.length > 0) {
            error_object = error_object.concat(this.cpcCtrlCAC.first.formErrors());
        }

        return error_object;
    }

    setFieldVisibility(fields):void {
        for (var f = 0; f < fields.length; f++) {
            switch (fields[f].field) {
                case 'cardType' : this.visibleCardType = fields[f].visible;
                break;
                case 'cardHolderName' : this.visibleCardholderName = fields[f].visible;
                break;
                case 'vatIdPt' : this.visibleVatIdPt = fields[f].visible;
                break;
                case 'vatIdEs' : this.visibleVatIdEs = fields[f].visible;
                break;
            }
        }
    }

    setAllTouched() {
        this.cpcForm.get('cardType').markAsTouched();
        this.cpcForm.get('cardHolderName').markAsTouched();
        this.cpcForm.get('cardHolderCard').markAsTouched();
        this.cpcForm.get('cardExpirationMonth').markAsTouched();
        this.cpcForm.get('cardExpirationYear').markAsTouched();
        this.cpcForm.get('cardCVV').markAsTouched();
        this.cpcForm.get('vatIdEs').markAsTouched();
        this.formTouched = true;
        this.updateCAC();
    }
}
