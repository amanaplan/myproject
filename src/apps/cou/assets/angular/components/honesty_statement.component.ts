import { Component, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: 'assets/resources/angular/cou/assets/angular/templates/honesty_statement.component.tpl.html'
})
export class HonestyStatementComponent {
    honestyStatementForm:FormGroup;
    submitBtnClicked:boolean = false;

    @ViewChildren('errorList') errorList;

    constructor(private fb:FormBuilder) {
        this.honestyStatementForm = fb.group({
            "claimHonestyStatementAgreement" : [false, Validators.required]
        })
    }

    submitForm():void {
        this.submitBtnClicked = true;

        for (var prop in this.honestyStatementForm.controls) {
            if (this.honestyStatementForm.controls.hasOwnProperty(prop)) {
                this.honestyStatementForm.controls[prop].markAsTouched();
            }
        }

        if (!this.honestyStatementForm.valid) {
            this.focusError();
        }
    }

    focusError() {
        var that = this;

        setTimeout(function () {
            if (that.errorList.length > 0) {
                that.errorList.first.nativeElement.querySelector('ul li:first-child a').focus();
            }
        });
    }
}
