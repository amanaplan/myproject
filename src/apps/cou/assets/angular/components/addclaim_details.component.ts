import { Component, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidateNotEqual } from '../../../../../common/apps/assets/angular/equal.validator';

@Component({
    templateUrl: 'assets/resources/angular/cou/assets/angular/templates/addclaim_details.component.tpl.html'
})
export class AddClaimDetailsComponent {
    addClaimDetailsForm:FormGroup;
    submitBtnClicked:boolean = false;
    claimDetailPkgIssue:string = "0";

    //view variables
    viewShipDetailsReceiverTxt:boolean = false;
    viewCompleteAddress:boolean = true;
    viewDeliveryDate:boolean = false;
    viewLossDetails:boolean = false;

    //demo variables
    demoPgView:number = 1;

    @ViewChildren('errorList') errorList;

    constructor(private fb:FormBuilder) {
        this.addClaimDetailsForm = fb.group({
            "claimDetailFromContactName" : ["", Validators.required],
            "claimDetailFromTelephone" : ["", Validators.required],
            "claimDetailFromTelephoneExt" : [""],
            "claimDetailFromAlternateTelephone" : [""],
            "claimDetailFromAlternateTelephoneExt" : [""],
            "claimDetailFromEmail" : [""],
            "claimDetailToContactName" : ["", Validators.required],
            "claimDetailToTelephone" : ["", Validators.required],
            "claimDetailToTelephoneExt" : [""],
            "claimDetailToAlternateTelephone" : [""],
            "claimDetailToAlternateTelephoneExt" : [""],
            "claimDetailToEmail" : [""],
            "claimDetailPkgIssue" : [0, [Validators.required, ValidateNotEqual(0)]]
        });
    }

    formValid():boolean {
        if (!this.addClaimDetailsForm.controls['claimDetailFromContactName'].valid
            || !this.addClaimDetailsForm.controls['claimDetailFromTelephone'].valid
            || !this.addClaimDetailsForm.controls['claimDetailToContactName'].valid
            || !this.addClaimDetailsForm.controls['claimDetailToTelephone'].valid) {
            return false;
        }

        if (!this.addClaimDetailsForm.controls['claimDetailFromEmail'].valid
            || !this.addClaimDetailsForm.controls['claimDetailToEmail'].valid) {
            return false;
        }

        if (this.viewLossDetails && this.claimDetailPkgIssue == '0') {
            return false;
        }

        return true;
    }

    submitForm() {
        this.submitBtnClicked = true;

        for (var prop in this.addClaimDetailsForm.controls) {
            if (this.addClaimDetailsForm.controls.hasOwnProperty(prop)) {
                this.addClaimDetailsForm.controls[prop].markAsTouched();
            }
        }

        if (!this.formValid()) {
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

    demoViewChange() {
        switch (Number(this.demoPgView)) {
            case 1 :
                this.viewShipDetailsReceiverTxt = false;
                this.viewCompleteAddress = true;
                this.viewDeliveryDate = false;
                this.viewLossDetails = false;
            break;
            case 2 :
                this.viewShipDetailsReceiverTxt = true;
                this.viewCompleteAddress = false;
                this.viewDeliveryDate = false;
                this.viewLossDetails = false;
            break;
            case 3 :
                this.viewShipDetailsReceiverTxt = false;
                this.viewCompleteAddress = true;
                this.viewDeliveryDate = true;
                this.viewLossDetails = true;
            break;
            case 4 :
                this.viewShipDetailsReceiverTxt = false;
                this.viewCompleteAddress = false;
                this.viewDeliveryDate = true;
                this.viewLossDetails = true;
            break;
        }
    }
}
