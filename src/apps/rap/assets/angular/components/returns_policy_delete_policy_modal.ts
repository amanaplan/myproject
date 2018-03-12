import { Component } from '@angular/core';
import { Subject, Observable} from 'rxjs/Rx';
declare var jQuery:any;

const EVENT_DEL_CLICKED = 1;

@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_policy_delete_policy_modal.tpl.html'
})
export class ReturnsPolicyDeletePolicyModalComponent {

    dEvent = new Subject();
    constructor() {
        //this.dEvent = new Subject();
    }

    delPolicyEvent():Observable<any> {
        console.log(this.dEvent);
        return this.dEvent;
    }

    demoIDeletedAPolicy(): void {
        this.dEvent.next(EVENT_DEL_CLICKED);
    }

}
