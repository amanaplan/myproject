import { Component, ViewChild, OnChanges, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReturnsAdminRemoveUserModalComponent } from './returns_admin_remove_user_modal';

@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_admin_edit.tpl.html'
})
export class ReturnsAdminEditComponent {
    //New Angular 2/4 Modal
    @ViewChild('removeUserPermissionsModal') removeUserPermissionsModal;

    // editUserForm:FormGroup;
    // editName: string = "";
    // editEmail: string = "";
    // editUserFormSubmitAttempt:boolean = false;

    constructor(public _router: Router, public _route: ActivatedRoute, fb: FormBuilder) {
        // this.editUserForm = fb.group({
        //     'editName': '',
        //     'editEmail': ''
        // });
    }

    //Update User Button
    // demoUpdateUserSection():void {
    //     this.editUserFormSubmitAttempt = true;
    //     this.editUserForm.controls['editName'].markAsTouched();
    //     this.editUserForm.controls['editEmail'].markAsTouched();
    //     if (!this.editUserForm.valid) {
    //         return;
    //     }
    //     this._router.navigate(["/administration/users"]); //sends us back to the main admin page if the Name and Email fields are valid
    // }

    //New Angular 2/4 Modal
    // ngAfterViewInit() {
    //     this.removeUserPermissionsModal.setProperties({
    //         component: ReturnsAdminRemoveUserModalComponent
    //     });
    //
    //     //console.log('Properties Has Been Set');
    //
    //     this.removeUserPermissionsModal.modalCompCreated().subscribe((val) => {
    //         val.primaryButtonRedirect(true);
    //         //this.removeUserPermissionsModal.closePopup();
    //     });
    //
    // }
    //
    //
    //
    // //New Angular 2/4 Modal
    // demoRemoveUserPermissionsModal(): void {
    //     this.removeUserPermissionsModal.open();
    //     //console.log('I am open');
    // }
}
