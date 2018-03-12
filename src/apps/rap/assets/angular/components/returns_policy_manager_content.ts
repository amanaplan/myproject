import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';
import { ReturnsPolicyDeletePolicyModalComponent } from './returns_policy_delete_policy_modal';

declare var jQuery:any;

@Component({
    selector: 'ups-returns-policy-manager',
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_policy_manager_content.tpl.html',
    host: {
        '(window:resize)' : 'resize($event)'
    },
    providers : [ BrowserWindow, ViewPorts]
})
export class ReturnsPolicyManagerContentComponent {
    //Variable for Viewport
    viewportSize:vp;
    returnsManager = [
        {
            returnsManagerLabel: "ACCESSORIES"
        }
    ]
    panelMessaging:string = "You've successfully created a new return policy named 'ACCESSORIES'";
    returnsPolicyRow:boolean = true;
    universalReturnRulesLink: string = "";
    //@ViewChild("upsDeletePolicyModal") deletePolicyModal;

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
        }
    ];

    //New Angular 2/4 Modal
    @ViewChild("deletePolicyModal2") deletePolicyModal2;

    constructor(private viewportService: ViewPorts, public _router: Router, public _route: ActivatedRoute) {
        viewportService.viewPortChange().subscribe((val) => {
            this.viewportSize = val;
        });

        _router.events.subscribe((val) => {
             if (_router.url == '/returnsPolicies/returnsManager') {
                 this.universalReturnRulesLink = "/returnsPolicies/returnsManager/universalReturnRules";
             } else {
                this.universalReturnRulesLink = "/merchantPlugIn/returnsManager/universalReturnRules";
             }
         });

    }

    // ngOnInit() {
    //     this.deletePolicyModal.delPolicyEvent().subscribe((val) => {
    //         this.panelMessaging = "You've successfully deleted 'ACCESSORIES' from your policies";
    //         this.returnsPolicyRow = false;
    //         //console.log("delete btn clickeded");
    //     });
    // }

    //Button That Triggers the Delete Policy Modal
    //CANNOT USE BELOW METHOD BECAUSE IT USES JQUERY; DO NOT INCLUDE FOR PRODUCTION
    //PLEASE USE MODALS STARTING AT LINE 40
    // demoReturnsPolicyDeleteModal(): void {
    //     jQuery('#showDeletePolicyModal').modal('show');
    // }

    //New Angular 2/4 Modal
    ngAfterViewInit() {
        this.deletePolicyModal2.setProperties({
            component: ReturnsPolicyDeletePolicyModalComponent
        });

        this.deletePolicyModal2.modalCompCreated().subscribe((val) => {
            val.delPolicyEvent().subscribe((val) => {
                this.panelMessaging = "You've successfully deleted 'ACCESSORIES' from your policies";
                this.returnsPolicyRow = false;
                this.deletePolicyModal2.closePopup();
            });
        });

    }

    //New Angular 2/4 Modal
    demoReturnsPolicyDeleteModal2(): void {
        this.deletePolicyModal2.open();

        /*this.deletePolicyModal2.getModalComponent().delPolicyEvent().subscribe((val) => {
            this.panelMessaging = "You've successfully deleted 'ACCESSORIES' from your policies";
            this.returnsPolicyRow = false;
        });*/
    }
}
