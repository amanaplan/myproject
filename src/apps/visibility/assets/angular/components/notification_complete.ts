import { Component,  AfterViewInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';
import { Subject, Observable} from 'rxjs/Rx';

declare var $:any;
@Component({
    templateUrl: 'assets/resources/angular/visibility/assets/angular/templates/notification_complete.tpl.html',
})
export class NotificationCompleteComponent {
    closeSubject = new Subject();
    notificationsSelected = {
        'pkgUpdatesCurStatus' : true,
        'pkgUpdatesDelay' : true,
        'pkgUpdatesDelivered' : true
    };

    closeEvent():Observable<any> {
        return this.closeSubject;
    }

    closeBtn():void {
        this.closeSubject.next(true);
    }
}
