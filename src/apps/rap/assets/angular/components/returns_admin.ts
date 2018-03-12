import { Component, ViewChild, OnChanges, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReturnsAdminRemoveUserModalComponent } from './returns_admin_remove_user_modal';
declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_admin.tpl.html'
})
export class ReturnsAdminComponent {

    //New Angular 2/4 Modal
    @ViewChild('removeUserPermissionsModal') removeUserPermissionsModal;
    //janeDoeRow: boolean = true;

    filterPermissions = [
        {
            filterPermissionsLabel: "Adminstrators",
        },
        {
            filterPermissionsLabel: "Manage policy",
        },
        {
            filterPermissionsLabel: "View Policy",
        },
        {
            filterPermissionsLabel: "Override Ineligible Returns",
        },
        {
            filterPermissionsLabel: "View History",
        },
        {
            filterPermissionsLabel: "No Permissions"
        }
    ];

    showPermissions: boolean = false;
    constructor(public _router: Router, fb: FormBuilder) {
    }
    //New Angular 2/4 Modal
    ngAfterViewInit() {
        this.removeUserPermissionsModal.setProperties({
            component: ReturnsAdminRemoveUserModalComponent
        });

        this.removeUserPermissionsModal.modalCompCreated().subscribe((val) => {
            val.removeUserEvent().subscribe((val) => {
                //this.janeDoeRow = false;
                this.removeUserPermissionsModal.closePopup();
            });
        });
    }

    //New Angular 2/4 Modal
    demoRemoveUserPermissionsModal(): void {
        this.removeUserPermissionsModal.open();
        //console.log('I am open2');
    }

    addFiltersButton():void {
        this.showPermissions = !this.showPermissions;
    }

}
