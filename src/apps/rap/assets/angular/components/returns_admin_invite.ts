import { Component, ViewChildren, OnChanges, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_admin_invite.tpl.html'
})
export class ReturnsAdminInviteComponent {

    editUserForm:FormGroup;
    editEmailInvite: string = "";
    editUserID: string = "";
    editUserFormSubmitAttempt:boolean = false;

    constructor(public _router: Router, public _route: ActivatedRoute, fb: FormBuilder) {
        this.editUserForm = fb.group({
            'editEmailInvite': '',
            'editUserID': ''
        });
    }

    //Confirm Invite Button
    demoConfirmInviteUserSection():void {
        this.editUserFormSubmitAttempt = true;
        this.editUserForm.controls['editEmailInvite'].markAsTouched();
        this.editUserForm.controls['editUserID'].markAsTouched();
        if (!this.editUserForm.valid) {
            return;
        }
        this._router.navigate(["/administration/users"]); //sends us back to the main admin page if the Email field is valid
    }
}
