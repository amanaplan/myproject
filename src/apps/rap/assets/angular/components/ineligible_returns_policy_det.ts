import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/ineligible_returns_policy_det.tpl.html'
})
export class IneligibleReturnsPolicyDetComponent {
    // policyDetailsForm:FormGroup;
    // customerEmailReq: string = "";
    // policyDetailsFormSubmitAttempt:boolean = false;

    constructor(public _router: Router, public _route: ActivatedRoute, fb: FormBuilder) {
        // this.policyDetailsForm = fb.group({
        //     'customerEmailReq': ''
        // });
    }

    //Send Label Button
    // demoSendLabel():void {
    //     this.policyDetailsFormSubmitAttempt = true;
    //     this.policyDetailsForm.controls['customerEmailReq'].markAsTouched();
    //     if (!this.policyDetailsForm.valid) {
    //         return;
    //     }
    //     this._router.navigate(["/ineligibleReturns/complete"]); //sends us to complete page if the Email input is valid
    // }
}
