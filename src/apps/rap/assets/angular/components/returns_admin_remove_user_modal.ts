import { Component } from '@angular/core';
import { Subject, Observable} from 'rxjs/Rx';
declare var jQuery:any;

const EVENT_DEL_CLICKED = 1;

@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_admin_remove_user_modal.tpl.html'
})
export class ReturnsAdminRemoveUserModalComponent {

    editRedirect: boolean = false;

    dEvent = new Subject();
    constructor() {
        //this.dEvent = new Subject();
    }

    primaryButtonRedirect(setting: boolean): void {
        this.editRedirect = setting;
        // console.log(setting);
        // console.log('primaryButtonRedirect');

    }

    removeUserEvent():Observable<any> {
        console.log(this.dEvent);
        return this.dEvent;
    }

    demoIDeletedAUser(): void {
        this.dEvent.next(EVENT_DEL_CLICKED);
    }
    demoIDidNotDeleteAUser(): void {
        this.dEvent.next(EVENT_DEL_CLICKED);
    }

}
