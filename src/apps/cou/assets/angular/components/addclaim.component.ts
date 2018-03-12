import { Component, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';
import { ValidateNotEqual } from '../../../../../common/apps/assets/angular/equal.validator';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/cou/assets/angular/templates/addclaim.component.tpl.html'
})
export class AddClaimComponent {
    addClaimForm:FormGroup;
    submitBtnClicked:boolean = false;
    claimNewAcctNumberSel:number = 0;
    claimNewAvailableSelAll:boolean = false;
    claimNewBatchType:string = "1";
    claimNewRelationship:string = "0";
    claimNewReport:string = "0";
    claimBatchFile:string = "";

    multiSelTrkNums = [
        { trkNum : "1Z2222222222222222", selected: false },
        { trkNum : "1Z2222222222222233", selected: false },
        { trkNum : "1Z2222222222222244", selected: false },
        { trkNum : "1Z2222222222222255", selected: false },
        { trkNum : "1Z2222222222222266", selected: false }
    ];

    //view variables
    viewFreightPgkMsg:boolean = false;
    viewMultiPieceSel:boolean = false;
    viewPkgRelationship:boolean = true;
    viewPrepopulatedTxt:boolean = true;
    viewShippingNumSel:boolean = true;
    viewProblemReport:boolean = true;
    viewNextBtnShown:boolean = true;
    viewBatchClaims:boolean = false;

    //demo variables
    demoPgView:number = 1;

    @ViewChildren('claimNewBatchFile') claimNewBatchFile;
    @ViewChildren('errorList') errorList;

    constructor(private fb:FormBuilder) {
        this.addClaimForm = fb.group({
            "claimNewTrkNum" : ["", Validators.required],
            "claimNewAcctNumberSel" : [0, [Validators.required, ValidateNotEqual(0)]],
            "claimNewRelationship" : [0, [Validators.required, ValidateNotEqual(0)]],
            "claimNewAcctNumber" : ["", Validators.required],
            "claimNewAcctPostal" : ["", Validators.required],
            "claimNewReport" : [0, [Validators.required, ValidateNotEqual(0)]]
        });
    }

    formValid():boolean {
        if (!this.addClaimForm.controls['claimNewTrkNum'].valid && this.claimNewBatchType == '1') {
            return false;
        }

        if (this.claimNewRelationship == '0' && this.viewPkgRelationship) {
            return false;
        }

        if (!this.addClaimForm.controls['claimNewAcctNumberSel'].valid && this.viewShippingNumSel) {
            return false;
        }

        if (!this.addClaimForm.controls['claimNewAcctNumber'].valid && this.viewShippingNumSel && (this.claimNewAcctNumberSel == -1)) {
            return false;
        }

        if (!this.addClaimForm.controls['claimNewAcctPostal'].valid && this.viewShippingNumSel && (this.claimNewAcctNumberSel == -1)) {
            return false;
        }

        if (this.claimNewReport == '0' && this.viewProblemReport && this.claimNewBatchType == '1') {
            return false;
        }

        return true;
    }

    submitForm():void {
        this.submitBtnClicked = true;

        for (var prop in this.addClaimForm.controls) {
            if (this.addClaimForm.controls.hasOwnProperty(prop)) {
                this.addClaimForm.controls[prop].markAsTouched();
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

    claimNewAvailableSelAllChange() {
        if (this.claimNewAvailableSelAll) {
            //unselect all
            for (var g = 0; g < this.multiSelTrkNums.length; g++) {
                this.multiSelTrkNums[g].selected = false;
            }

            this.claimNewAvailableSelAll = false;
        } else {
            //select all
            for (var g = 0; g < this.multiSelTrkNums.length; g++) {
                this.multiSelTrkNums[g].selected = true;
            }

            this.claimNewAvailableSelAll = true;
        }
    }

    claimNewAvailableCheckSelAll() {
        for (var g = 0; g < this.multiSelTrkNums.length; g++) {
            if (!this.multiSelTrkNums[g].selected) {
                this.claimNewAvailableSelAll = false;

                return false;
            }
        }

        this.claimNewAvailableSelAll = true;

        return true;
    }

    getClaimBatchFilePath():string {
        if (this.claimBatchFile == "") {
            return "";
        }

        var fileStrSplit = this.claimBatchFile.split("\\");

        return fileStrSplit[(fileStrSplit.length - 1)];
    }

    claimBatchFileChange(e) {
        this.claimBatchFile = this.claimNewBatchFile.first.nativeElement.value;
    }

    openClaimBatchFileDialog() {
        this.claimNewBatchFile.first.nativeElement.click();
    }

    clearClaimBatchFile() {
        this.claimNewBatchFile.first.nativeElement.value = "";
        this.claimBatchFile = this.claimNewBatchFile.first.nativeElement.value;
    }

    claimBatchFileAttached():boolean {
        if (this.claimBatchFile == "") {
            return false;
        } else {
            return true;
        }
    }

    demoViewChange() {
        switch (Number(this.demoPgView)) {
            case 1 :
                this.viewBatchClaims = false;
                this.viewFreightPgkMsg = false;
                this.viewMultiPieceSel = false;
                this.viewPkgRelationship = true;
                this.viewPrepopulatedTxt = true;
                this.viewShippingNumSel = true;
                this.viewProblemReport = true;
                this.viewNextBtnShown = true;
            break;
            case 2 :
                this.viewBatchClaims = false;
                this.viewFreightPgkMsg = false;
                this.viewMultiPieceSel = true;
                this.viewPkgRelationship = true;
                this.viewPrepopulatedTxt = true;
                this.viewShippingNumSel = true;
                this.viewProblemReport = true;
                this.viewNextBtnShown = true;
            break;
            case 3 :
                this.viewBatchClaims = false;
                this.viewFreightPgkMsg = true;
                this.viewMultiPieceSel = false;
                this.viewPkgRelationship = false;
                this.viewPrepopulatedTxt = false;
                this.viewShippingNumSel = false;
                this.viewProblemReport = false;
                this.viewNextBtnShown = false;
            break;
            case 4 :
                this.viewBatchClaims = true;
                this.viewFreightPgkMsg = false;
                this.viewMultiPieceSel = false;
                this.viewPkgRelationship = true;
                this.viewPrepopulatedTxt = true;
                this.viewShippingNumSel = true;
                this.viewProblemReport = true;
                this.viewNextBtnShown = true;
            break;
        }

        this.claimNewBatchType = '1';
    }
}
