import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ReturnsPolicyDeletePolicyModalComponent } from './returns_policy_delete_policy_modal';
//declare var $:any;
declare var jQuery:any;
@Component({
    selector: 'ups-returns-policy-panel',
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_policy_panel.tpl.html'
})
export class ReturnsPolicyPanelComponent {
    // noneNewAccts:boolean = true;
    // addNewAcct:boolean = false;
    // hasAccts:boolean = false;
    policyHeading: string = "";
    policyMessaging: string = "";

    returnAcct:boolean[] = [];

    returnReason:string = "0";
    returnPolicyName:string = "";
    returnPolicyFreqNum:string = "";
    returnFreqType:string = "1";
    returnAddrSel:number = 0;
    returnAcctsListSel: number = 0;
    returnBillingAcct:number;
    returnServiceOption:number;
    returnEmailCollection: string = "0";
    changeCostReturnShipping: string = "2";

    sect1Complete:boolean = false;
    sect2Complete:boolean = false;
    sect3Complete:boolean = false;
    sect4Complete:boolean = false;
    sect5Complete:boolean = false;

    sect1Error:boolean = false;
    sect2Error:boolean = false;
    sect3Error:boolean = false;
    sect4Error:boolean = false;
    sect5Error:boolean = false;

    billingDropdown:boolean = true;
    billingSearchInput:boolean = false;
    billingScrollableList:boolean = false;
    reasonsSelectedOption: boolean = true;

    editPolicyAddition:boolean = false;
    viewPolicyAddition:boolean = false;
    makeFieldsDisabled:boolean = false;
    refundCalculationDrawer:boolean = false;
    additionalShippingInfoDrawer:boolean = false;
    merchantPlugInCreatePolicy:boolean = false;

    returnPolicyAccount = [
        {
            "id" : 1,
            "returnPolicyAccountLabel" : "Jewelry, 1A2345"
        },
        {
            "id" : 2,
            "returnPolicyAccountLabel" : "Knits and Robes, 1A2345"
        },
        {
            "id" : 3,
            "returnPolicyAccountLabel" : "Joggers, 1A2345"
        },
        {
            "id" : 4,
            "returnPolicyAccountLabel" : "Joggers, 1A2345"
        },
        {
            "id" : 5,
            "returnPolicyAccountLabel" : "Joggers, 1A2345"
        },
        {
            "id" : 6,
            "returnPolicyAccountLabel" : "Menswear, 1A2345"
        },
        {
            "id" : 7,
            "returnPolicyAccountLabel" : "Swimwear, 1A2345"
        },
        {
            "id" : 8,
            "returnPolicyAccountLabel" : "Swimwear, 1A2345"
        },
        {
            "id" : 9,
            "returnPolicyAccountLabel" : "Sunglasses, 1A2345"
        },
        {
            "id" : 10,
            "returnPolicyAccountLabel" : "Sunglasses, 1A2345"
        }
    ];
    returnPreferredBillAddress = [
        {
            "id" : 1,
            "returnPreferredLabel" : "Last Billing Used"
        },
        {
            "id" : 2,
            "returnPreferredLabel" : "Accessories | 123456"
        },
        {
            "id" : 3,
            "returnPreferredLabel" : "Beauty/Bath Products | 1234345"
        },
        {
            "id" : 4,
            "returnPreferredLabel" : "Children/Toys | 123353"
        },
        {
            "id" : 5,
            "returnPreferredLabel" : "Ritem rat providel | 1234345"
        },
        {
            "id" : 6,
            "returnPreferredLabel" : "Otat. Bea voloreh endistia | 1234345"
        },
        {
            "id" : 7,
            "returnPreferredLabel" : "Utasitae occum nis est | 1234345"
        },
        {
            "id" : 8,
            "returnPreferredLabel" : "Ritem rat providel exprellas quis | 1234345"
        },
        {
            "id" : 9,
            "returnPreferredLabel" : "Otat. Bea voloreh | 1234345"
        },
        {
            "id" : 10,
            "returnPreferredLabel" : "Accessories | 123456"
        },
        {
            "id" : 11,
            "returnPreferredLabel" : "Beauty/Bath Products | 1234345"
        },
        {
            "id" : 12,
            "returnPreferredLabel" : "Children/Toys | 123353"
        },
        {
            "id" : 13,
            "returnPreferredLabel" : "Ritem rat providel | 1234345"
        },
        {
            "id" : 14,
            "returnPreferredLabel" : "Otat. Bea voloreh endistia | 1234345"
        }
    ];


    //New Angular 2/4 Modal
    @ViewChild("deletePolicyModal2") deletePolicyModal2;

    //Init the form groups
    returnPolicyCreateForm:FormGroup;

    returnPolicyCreateSubmitAttempt:boolean = false;

    selectedAll:boolean = false;

    checkies = [

        {
            name: "Condition or Quality of Merchandise",
            selected: false
        },
        {
            name: "Damaged upon arrival",
            selected: false
        },
        {
            name: "Defective or does not work",
            selected: false
        },
        {
            name: "Missing parts or accessories",
            selected: false
        },
        {
            name: "Did not meet the customer's expectations",
            selected: false
        },
        {
            name: "Incorrect product, size, or color",
            selected: false
        },
        {
            name: "Poor workmanship",
            selected: false
        },
        {
            name: "Expected better quality",
            selected: false
        },
        {
            name: "Lorem Ipsum Dolor",
            selected: false
        },
        {
            name: "Morbi sem tellus",
            selected: false
        },
        {
            name: "Maecenas vel egestas nulla",
            selected: false
        },
        {
            name: "Ut sagittis faucibus diam",
            selected: false
        },
        {
            name: "Mauris in urna est",
            selected: false
        }

    ];

    constructor(public _router: Router, public _route: ActivatedRoute, fb:FormBuilder) {
        for (var i=0; i < 10; i++) {
            this.returnAcct[i] = false;
        }

        this.returnPolicyCreateForm = fb.group({
            "returnPolicyName" : "",
            "returnPeriodNumber" : "",
            "returnAddressSel" : "",
            "returnAccountsListSel" : ""
        });


         _router.events.subscribe((val) => {
              if (_router.url == '/returnsPolicies/editPolicy') {
                  this.policyHeading = "Edit Policy: ACCESSORIES";
                  this.policyMessaging = "Make changes to any section of this policy.";
                  this.editPolicyAddition = true;
                  this.refundCalculationDrawer = false;
                  this.additionalShippingInfoDrawer = true;
                  this.viewPolicyAddition = false;
                  this.merchantPlugInCreatePolicy = false;
              } else if (_router.url == '/returnsPolicies/viewPolicy') {
                  this.policyHeading = "View Policy";
                  this.policyMessaging = "View section of this policy";
                  this.editPolicyAddition = false;
                  this.viewPolicyAddition = true;
                  this.makeFieldsDisabled = true;
                  this.refundCalculationDrawer = false;
                  this.additionalShippingInfoDrawer = true;
                  //this.merchantPlugInCreatePolicy = false;
              } else if (_router.url == '/merchantPlugIn/createNamePlugIn/createPolicy' || '/merchantPlugIn/createPlugInDetail/createPolicy' ) {
                  this.policyHeading = "Create New Policy";
                  this.policyMessaging = "Complete each section to create a return policy."
                  this.refundCalculationDrawer =  true;
                  this.additionalShippingInfoDrawer = false;
                  this.merchantPlugInCreatePolicy = true;
                  this.viewPolicyAddition = false;
              } else {
                  this.policyHeading = "Create New Policy";
                  this.policyMessaging = "Complete each section to create a new pre-authorized return policy.";
                  this.refundCalculationDrawer = false;
                  this.additionalShippingInfoDrawer = true;
                  this.viewPolicyAddition = false;
                  this.merchantPlugInCreatePolicy = false;
              }
          });

    }

    selChanged():void {
        for (var u = 0; u < this.checkies.length; u++) {
            if (!this.checkies[u].selected) {
                this.selectedAll = false;
                return;
            }
        }
        this.selectedAll = true;
    }

    uncheckCheck(val):void {
        this.checkies[val].selected = false;
        this.selChanged();
    }

    selectAll():void {
        for (var u = 0; u < this.checkies.length; u++) {
            this.checkies[u].selected = this.selectedAll;
        }
    }

    checkAcctChosen():boolean {
        for (var e=0; e < 10; e++) {
            if (this.returnAcct[e] == true) {
                return true;
            }
        }

        return false;
    }

    onReturnAcctChange(event):void {
        var acctNamed = false;
        var acctChosen = this.checkAcctChosen();

        if (this.returnPolicyName !== "") {
            acctNamed = true;
        }

        if (acctChosen && acctNamed) {
            this.sect1Complete = true;
        } else {
            this.sect1Complete = false;
        }
    }

    onPeriodChange(event):void {
        if (this.returnPolicyFreqNum !== "") {
            this.sect2Complete = true;
            //console.log(this.returnPolicyFreqNum);
        } else {
            this.sect2Complete = false;
        }
    }

    checkShippingService():boolean {
        if (this.returnServiceOption >= 0 && this.returnServiceOption < 6) {
            return true;
        }

        return false;
    }

    checkBillAcctChosen():boolean {
        if (this.returnBillingAcct >= 0 && this.returnBillingAcct < 15) {
            return true;
        }

        return false;
    }

    onShippingChange(event):void {
        if (this.billingScrollableList == true) {
            if (this.returnAddrSel > 0 && this.checkShippingService() && this.checkBillAcctChosen() ) {
                this.sect3Complete = true;
            } else {
                this.sect3Complete = false;
            }
        } else {
            if (this.returnAddrSel > 0 && this.checkShippingService() && this.returnAcctsListSel > 0) {
                this.sect3Complete = true;
            } else {
                this.sect3Complete = false;
            }
        }
    }

    savePolicy():void {
        this.returnPolicyCreateSubmitAttempt = true;

        this.returnPolicyCreateForm.controls['returnPolicyName'].markAsTouched();
        this.returnPolicyCreateForm.controls['returnPeriodNumber'].markAsTouched();
        this.returnPolicyCreateForm.controls['returnAddressSel'].markAsTouched();
        this.returnPolicyCreateForm.controls['returnAccountsListSel'].markAsTouched();

        if (this.sect1Complete && this.sect2Complete && this.sect3Complete) {
            // this.noneNewAccts = true;
            // this.hasAccts = true;
            // this.addNewAcct = false;
            this._router.navigate(["/returnsPolicies/returnsManager"]);
        }
    }

    savePolicy2():void {
        this.returnPolicyCreateSubmitAttempt = true;

        this.returnPolicyCreateForm.controls['returnPolicyName'].markAsTouched();
        this.returnPolicyCreateForm.controls['returnPeriodNumber'].markAsTouched();
        this.returnPolicyCreateForm.controls['returnAddressSel'].markAsTouched();
        this.returnPolicyCreateForm.controls['returnAccountsListSel'].markAsTouched();

        if (this.sect1Complete && this.sect2Complete && this.sect3Complete) {
            // this.noneNewAccts = true;
            // this.hasAccts = true;
            // this.addNewAcct = false;
            this._router.navigate(["/merchantPlugIn/createPlugInDetail"]);
        }
    }

    logThis(data):void {
        console.log(data);
    }

    lessThanTen():void {
        this.billingDropdown = true;
        this.billingSearchInput = false;
        this.billingScrollableList = false;
    }

    tenThroughThirty():void {
        this.billingDropdown = false;
        this.billingSearchInput = false;
        this.billingScrollableList = true;
    }

    moreThanThirty():void {
        this.billingDropdown = false;
        this.billingSearchInput = true;
        this.billingScrollableList = true;
    }

    demoCloseOutSelectedOption():void {
        this.reasonsSelectedOption = false;
    }

    // demoReturnsPolicyDeleteModal(): void {
    //     //this.showReportPreviewModal = true;
    //     jQuery('#showDeletePolicyModal').modal('show');
    // }

    //New Angular 2/4 Modal
    ngAfterViewInit() {
        this.deletePolicyModal2.setProperties({
            component: ReturnsPolicyDeletePolicyModalComponent
        });
    }

    //New Angular 2/4 Modal
    demoReturnsPolicyDeleteModal2(): void {
        this.deletePolicyModal2.open();
    }


//OLD CODE
    //Pushes what is chosen in the checkboxes to the "Selected Options" div
    /*selChanged():void {
        this.selChecks = [];
        //console.log(this.selChecks);
        for (var u = 0; u < this.daChecks.length; u++) {
            if (this.daChecks[u]) {
                this.selChecks.push({
                    name: this.checkies[u].name,
                    index: u
                });
            }
        }
        if (this.daChecks.length == this.checkies.length) {
            var firstCheck;
            for (var u = 0; u < this.daChecks.length; u++) {
                if ( u == 0) {
                    var firstCheck = this.daChecks[u];
                } else {
                    if (!firstCheck == this.daChecks[u]) {
                        this.selectedAll = false;
                        return
                    }
                }
            }
            this.selectedAll = firstCheck;
        }
    }*/

    //'X' on the Selected Option Div
    /*uncheckCheck(val):void {
        this.daChecks[val] = false;
        this.selChanged();
    }

    //Select All Button
    /*selectAll() {
        var setChecks = true;
        console.log(setChecks);
        if (this.checkies.length == this.daChecks.length) {
            var oneUnchecked = false;
            for (var v = 0; v < this.daChecks.length; v++) {
                if (this.daChecks[v] == false) {
                    oneUnchecked = true;
                    break;
                }
            }
            if (oneUnchecked == false) {
                setChecks = false;
            }
        }
       for (var u = 0; u < this.checkies.length; u++) {
           this.daChecks[u] = setChecks;
         //this.checkies[u].selected = this.selectedAll;
       }
       this.selChanged();
   }*/

    // createNew():void {
    //     this.noneNewAccts = false;
    //     this.addNewAcct = true;
    //
    //     this.returnPolicyName = "";
    //     this.returnReason = "0";
    //     this.returnFreqType = "1";
    //     this.returnAddrSel = 0;
    //     this.returnAcctsListSel = 0;
    //     this.returnPolicyFreqNum = "";
    //     this.returnEmailCollection = "2";
    //
    //     this.returnPolicyCreateSubmitAttempt = false;
    //     this.returnPolicyCreateForm.reset();
    //     console.log(this.returnPolicyCreateForm.controls['returnPolicyName']);
    //     this.returnPolicyCreateForm.controls['returnPolicyName'].markAsUntouched();
    //     this.returnPolicyCreateForm.controls['returnPeriodNumber'].markAsUntouched();
    //     this.returnPolicyCreateForm.controls['returnAddressSel'].markAsUntouched();
    // }

    // cancelCreateNew():void {
    //     this.noneNewAccts = true;
    //     this.addNewAcct = false;
    // }

}
