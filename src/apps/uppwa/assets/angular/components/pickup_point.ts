import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    /*selector: 'ups-pickup-point',*/
    templateUrl: 'assets/resources/angular/uppwa/assets/angular/templates/pickup_point.tpl.html'
})
export class PickupComponent {
    savedID:boolean = false;
    placardID:string = "";

    signinFormSubmitAttempt:boolean = false;

    signinForm:FormGroup;

    constructor(public _router: Router, fb: FormBuilder) {
        this.signinForm = fb.group({
            'placardID' : '',
            'postalCode': ''
        });
    }

    setSavedID():void {
        this.savedID = true;
        //this.placardID = "5554-56";

        this.signinForm.controls['placardID'].setValue("5554-56");
    }

    setNoSavedID():void {
        this.savedID = false;
        //this.placardID = "";
        this.signinForm.controls['placardID'].setValue("");
    }

    submitPlacardInfo(values):void {
        /*if (this.placardID) {
            this._router.navigateByUrl("/deliverymanage/" + this.placardID);
        }*/
        this.signinFormSubmitAttempt = true;

        if (!this.signinForm.valid) {
            return;
        }

        this._router.navigateByUrl("/deliverymanage/" + values.placardID);
    }
}
