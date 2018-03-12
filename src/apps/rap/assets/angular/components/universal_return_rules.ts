import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
declare var jQuery:any;
@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/universal_return_rules.tpl.html'
})
export class UniversalReturnRulesComponent {

    sect2Complete:boolean = false;
    //Init the form groups
    universalReturnForm:FormGroup;
    universalReturnFormSubmitAttempt:boolean = false;

    returnShipmentAccountOption:boolean[] = [];
    iHaveSelectedACategory: number = 0;
    iHaveSpecified:number = 0;
    priorityOptionsSelect:number = 0;
    merchantPlugInURR:boolean = false;
    standardPlugInURR:boolean = false;




    returnShipmentAccounts = [
        {
            returnShipmentAccountsLabel: "New York Main | 123456",
        },
        {
            returnShipmentAccountsLabel: "Refund Primary | 123353",
        },
        {
            returnShipmentAccountsLabel: "New York Secondary | 123456",
        },
        {
            returnShipmentAccountsLabel: "Petty Cash Flow | 123353",
        },
        {
            returnShipmentAccountsLabel: "Flexible Spending | 1234545",
        }
    ];

    priorityOptions = [
        {
            reason: "Reason for Return: product was faulty/does not work",
            shipToOrRegion: "Ship to: 3145 Venice Blvd.",
            billToLocation: "Flexible Spending 123456"
        },
        {
            reason: "Customer Location: Return to Address",
            shipToOrRegion: "Region: North Region",
            billToLocation: "1811 Main Street, Portland"
        },
        {
            reason: "Customer Location: Return to Address",
            shipToOrRegion: "Region: South Region",
            billToLocation: "500 Lamar St., Austin"
        },
        {
            reason: "Reason for Return: Product does not fit",
            shipToOrRegion: "Ship to: 114 August Lane, TX",
            billToLocation: "Flexible Spending 123456"
        }
    ];

    constructor(public _router: Router, public _route: ActivatedRoute, fb:FormBuilder) {
        for (var i=0; i < 10; i++) {
            this.returnShipmentAccountOption[i] = false;
        }
        this.universalReturnForm = fb.group({
            "returnShipmentAccounts1" : ""
        });

        _router.events.subscribe((val) => {
             if (_router.url == '/merchantPlugIn/returnsManager/universalReturnRules') {
                 this.merchantPlugInURR = true;
                 this.standardPlugInURR = false;
             } else {
                this.standardPlugInURR = true;
                this.merchantPlugInURR = false;
             }
         });

    }

    // bothRulesApply():void {
    //     //this.priorityOptionsSelect = 2
    //     // if (this.priorityOptionsSelect >= 0) {
    //     //     return true;
    //     // }
    //     //
    //     // return false;
    //     this.test = "r<2";
    // }

    checkAcctChosen():boolean {
        for (var e=0; e < 10; e++) {
            if (this.returnShipmentAccountOption[e] == true) {
                return true;
            }
        }

        return false;
    }

    onReturnAcctChange(event):void {
        //var acctNamed = false;
        var acctChosen = this.checkAcctChosen();

        // if (this.returnPolicyName !== "") {
        //     acctNamed = true;
        // }

        if (acctChosen) {
            this.sect2Complete = true;
        } else {
            this.sect2Complete = false;
        }
    }

    // onShippingChange(event):void {
    //     if (this.checkShippingService()) {
    //         this.sect2Complete = true;
    //     } else {
    //         this.sect2Complete = false;
    //     }
    // }

    savePolicy():void {
        this.universalReturnFormSubmitAttempt = true;

        // this.universalReturnForm.controls['returnPolicyName'].markAsTouched();
        // this.universalReturnForm.controls['returnPeriodNumber'].markAsTouched();
        // this.universalReturnForm.controls['returnAddressSel'].markAsTouched();
        // this.universalReturnForm.controls['returnAccountsListSel'].markAsTouched();

        //if (this.sect1Complete && this.sect2Complete && this.sect3Complete) {
        if (this.sect2Complete) {
            // this.noneNewAccts = true;
            // this.hasAccts = true;
            // this.addNewAcct = false;
            this._router.navigate(["/merchantPlugIn/returnsManager"]);
        }
    }

    saveURRPolicy(): void {
        if (this.merchantPlugInURR == true && this.standardPlugInURR == false ){
            this._router.navigate(["/merchantPlugIn/returnsManager"]);
        }

        if (this.standardPlugInURR == true && this.merchantPlugInURR == false){
            this._router.navigate(["/returnsPolicies/returnsManager"]);
        }

    }



}
