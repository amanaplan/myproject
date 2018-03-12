import { Component, ViewChild } from '@angular/core';
declare var jQuery:any;
@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_policy_panel_edit.tpl.html'
})
export class ReturnsPolicyPanelEditComponent {
    //New Angular 2/4 Modals
    @ViewChild('permanentChangeModal') permanentChangeModal;
    @ViewChild('addressChangeModal') addressChangeModal;
    constructor() {

    }

    //DEMO MODALS
    //CANNOT USE BELOW METHODS BECAUSE OF JQUERY; DO NOT INCLUDE FOR PRODUCTION
    //PLEASE USE MODALS STARTING AT LINE 27
    // demoPermanentChangeModal(): void {
    //     //this.showReportPreviewModal = true;
    //     jQuery('#showPermanentChangeModal').modal('show');
    // }

    // demoChangeAddressModal(): void {
    //     //this.showReportPreviewModal = true;
    //     jQuery('#showChangeOfAddressModal').modal('show');
    // }

    //New Angular 2/4 Modal
    demoPermanentChangeModal2(): void {
        //this.showReportPreviewModal = true;
        this.permanentChangeModal.open();
    }

    //New Angular 2/4 Modal
    demoChangeAddressModal2(): void {
        //this.showReportPreviewModal = true;
        this.addressChangeModal.open();
    }

    //Button That Triggers the Delete Policy Modal
    //CANNOT USE BELOW METHOD BECAUSE IT USES JQUERY; DO NOT INCLUDE FOR PRODUCTION
    // demoReturnsPolicyDeleteModal(): void {
    //     //this.showReportPreviewModal = true;
    //     jQuery('#showDeletePolicyModal').modal('show');
    // }
}
