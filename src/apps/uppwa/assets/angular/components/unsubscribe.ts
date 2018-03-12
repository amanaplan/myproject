import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/switchMap';

declare var jQuery:any;

@Component({
    /*selector: 'ups-pickup-point',*/
    templateUrl: 'assets/resources/angular/uppwa/assets/angular/templates/unsubscribe.tpl.html'
})
export class UnsubscribeComponent {

    unsubscribeEmail:string = "";

    unsubscribeFormSubmitAttempt:boolean = false;
    unsubscribeForm:FormGroup;
    unsubscribeResults: boolean = false;
    unsubscribeSuccess:boolean = false;
    unsubscribeFailure: boolean = false;
    unsubscribeMain: boolean = true;

    constructor(public _router: Router, fb: FormBuilder) {
        this.unsubscribeForm = fb.group({
            'unsubscribeEmail' : ''
        });
    }
    submitEmail(values):void {
        this.unsubscribeFormSubmitAttempt = true;

        if (!this.unsubscribeForm.valid) {
            return;
        }

        this.unsubscribeMain = false;
        this.unsubscribeResults = true;
        this.unsubscribeSuccess = true;

        //this._router.navigateByUrl("/deliverymanage/" + values.placardID);
    }

    demoError(): void {
        this.unsubscribeResults = true;
        this.unsubscribeFailure = true;
        this.unsubscribeSuccess = false;
    }

    demoSuccess(): void {
        this.unsubscribeResults = true;
        this.unsubscribeFailure = false;
        this.unsubscribeSuccess = true;
    }
}
