import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    /*selector: 'ups-pickup-point',*/
    templateUrl: 'assets/resources/angular/erp/assets/angular/templates/reason_return.tpl.html'
})
export class ReturnComponent {
    allowSkip:boolean = false;

    constructor(public _router: Router, public _route: ActivatedRoute) {
        if (_router.url == '/returnSkipAllowed') {
            this.allowSkip = true;
        }
    }
}
