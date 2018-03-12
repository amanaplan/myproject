/******************************************************************************
### DOCUMENTATION: (How to use this Component) ###

** Add this to your app.ts **
import { UPSCACComponent } from '../../../../common/apps/assets/angular/cac';

** Add the reference in your @NgModule **
@NgModule ({
    ...
    declarations: [
        ...
        UPSCACComponent
    ]
});

** Angular Magic happens and you can use this component in your component **
<ups-cac></ups-cac>



*******************************************************************************/
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { IFormErrors } from "./form_error.interface";

@Component({
    selector: 'ups-cac',
    templateUrl: 'assets/resources/angular/common/templates/cac.tpl.html'
})
export class UPSCACComponent {
    cacForm:FormGroup;
    staticCountryTxt:boolean = false;
    idAppend:string = "";
    visibleSurePost:boolean = false;

    field_names = {
        'countrySelect' : 'Country',
        'name' : 'Name or Company',
        'address0' : 'Street Address',
        'zipcode' : 'ZIP/Postal Code',
        'state' : 'State',
        'city' : 'City'
    };

    fieldDomId = {
        'countrySelect' : 'ups-cac-country' + this.idAppend,
        'name' : 'ups-cac-name' + this.idAppend,
        'address0' : 'ups-cac-address' + this.idAppend,
        'zipcode' : 'ups-cac-zipcode' + this.idAppend,
        'state' : 'ups-cac-state' + this.idAppend,
        'city' : 'ups-cac-city' + this.idAppend
    };

    countries = [
        {
            code: 'us',
            countryName: 'United States'
        },
        {
            code: 'ca',
            countryName: 'Canada'
        }
    ];

    cac = {
        countrySelect : 'us',
        country: 'United States'
    };

    constructor(private fb:FormBuilder) {
        this.cacForm = fb.group({
            'countrySelect' : ['', Validators.required],
            'name' : ['', Validators.required],
            'address0' : ['', Validators.required],
            'zipcode' : ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9-]*$")]],
            'state' : ['', Validators.required],
            'city' : ['', Validators.required]
        });

        //this.formErrors();
    }

    formErrors():IFormErrors[] {
        let error_object:IFormErrors[] = [];

        for (let i in this.cacForm.controls) {
            if (this.cacForm.controls[i].errors) {
                let errReq = (this.cacForm.controls[i].errors.required) ? true : false;
                let errPat = (this.cacForm.controls[i].errors.pattern) ? true : false;

                error_object.push({
                    'field_id' : i,
                    'field_name' : this.field_names[i],
                    'field_req' : errReq,
                    'field_pattern' : errPat,
                    'field_dom_id' : this.fieldDomId[i]
                });
            }

        }

        return error_object;
    }

    //adds a value onto the IDs in case there is multiple CAC forms on a page
    appendFormIDs(appendValue:string):void {
        this.idAppend = appendValue;

        this.fieldDomId = {
            'countrySelect' : 'ups-cac-country' + this.idAppend,
            'name' : 'ups-cac-name' + this.idAppend,
            'address0' : 'ups-cac-address' + this.idAppend,
            'zipcode' : 'ups-cac-zipcode' + this.idAppend,
            'state' : 'ups-cac-state' + this.idAppend,
            'city' : 'ups-cac-city' + this.idAppend
        };
    }

    setFieldVisibility(fields):void {
        for (var f = 0; f < fields.length; f++) {
            switch (fields[f].field) {
                case 'surePost' : this.visibleSurePost = fields[f].visible;
                break;
            }
        }
    }

    setStaticCountry(sety:boolean):void {
        this.staticCountryTxt = sety;
    }

    setAllTouched() {
        this.cacForm.get('countrySelect').markAsTouched();
        this.cacForm.get('name').markAsTouched();
        this.cacForm.get('address0').markAsTouched();
        this.cacForm.get('zipcode').markAsTouched();
        this.cacForm.get('state').markAsTouched();
        this.cacForm.get('city').markAsTouched();
    }
}
