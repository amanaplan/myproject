import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var $:any;



@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/ineligible_returns.tpl.html'
})
export class IneligibleReturnsComponent {
    showSearchResults:boolean = false;

    ineligibleReturnsSearchForm:FormGroup;
    trackingNum: string = "";
    ineligibleReturnsSearchFormSubmitAttempt:boolean = false;

    constructor(public _router: Router, public _route: ActivatedRoute, fb: FormBuilder) {
        this.ineligibleReturnsSearchForm = fb.group({
            'trackingNum': ''
        });
    }

    //Search Button Functionality
    demoSearchResults(): void {
        this.ineligibleReturnsSearchFormSubmitAttempt = true;
        this.ineligibleReturnsSearchForm.controls['trackingNum'].markAsTouched();
        if (!this.ineligibleReturnsSearchForm.valid) {
            return;
        }
        this.showSearchResults = true;
    }

    //Cancel Button Functionality
    demoCancelSearchResults(): void {
        this.showSearchResults = false;
        setTimeout(function () {
            $('#trackingNum').focus();
        }, 0);
    }
}
