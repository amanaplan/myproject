import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReturnsAdminRemoveUserModalComponent } from './returns_admin_remove_user_modal';

@Component({
    selector: 'ups-create-edit-form',
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_admin_create_edit_form.tpl.html'
})
export class ReturnsAdminCreateEditFormComponent {

    //New Angular 2/4 Modal
    @ViewChild('removeUserPermissionsModal') removeUserPermissionsModal;

    subheader: string = "";
    buttonText: string = "";
    showOnEditForm: boolean = false;

    createUserForm:FormGroup;
    createName: string = "";
    createEmail: string = "";
    createUserID: string = "";
    createUserFormSubmitAttempt:boolean = false;

    UserPermissions = [
        {
            "id" : 1,
            "userPermissionName" : "userAdministrative",
            "userPermissionLabel" : "Administrative (This user will have full rights and can add/invite users)"
        },
        {
            "id" : 2,
            "userPermissionName" : "userManagePol",
            "userPermissionLabel" : "Manage policies (create/edit/delete)"
        },
        {
            "id" : 3,
            "userPermissionName" : "userViewPolicies",
            "userPermissionLabel" : "View policies only"
        },
        {
            "id" : 4,
            "userPermissionName" : "userViewHistory",
            "userPermissionLabel" : "View history only"
        },
        {
            "id" : 5,
            "userPermissionName" : "userOverrideIneligible",
            "userPermissionLabel" : "Override ineligible returns"
        }
    ];

    constructor(public _router: Router, public _route: ActivatedRoute, fb: FormBuilder) {
        this.createUserForm = fb.group({
            'createName': '',
            'createUserID': '',
            'createEmail': ''
        });

        _router.events.subscribe((val) => {
             if (_router.url == '/administration/users/edit') {
                 this.subheader = "Edit User ID XXXXX";
                 this.showOnEditForm = true;
                 this.buttonText = "Update User";
             } else {
                 this.subheader = "Create New User";
                 this.showOnEditForm = false;
                 this.buttonText = "Create New User";
             }

         });
    }

    //New Angular 2/4 Modal
    ngAfterViewInit() {
        this.removeUserPermissionsModal.setProperties({
            component: ReturnsAdminRemoveUserModalComponent
        });

        //console.log('Properties Has Been Set');

        this.removeUserPermissionsModal.modalCompCreated().subscribe((val) => {
            val.primaryButtonRedirect(true);
            //this.removeUserPermissionsModal.closePopup();
        });

    }



    //New Angular 2/4 Modal
    demoRemoveUserPermissionsModal(): void {
        this.removeUserPermissionsModal.open();
        //console.log('I am open');
    }



    //Create New User Button
    demoCreateUserSection():void {
        this.createUserFormSubmitAttempt = true;
        this.createUserForm.controls['createName'].markAsTouched();
        this.createUserForm.controls['createUserID'].markAsTouched();
        this.createUserForm.controls['createEmail'].markAsTouched();
        if (!this.createUserForm.valid) {
            return;
        }
        this._router.navigate(["/administration/users"]); //sends us back to the main admin page if the Name, User ID, Email fields are valid
    }
}
