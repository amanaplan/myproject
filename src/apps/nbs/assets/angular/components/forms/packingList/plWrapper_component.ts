import { Component,  AfterViewInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { PackingListComponent } from './pl_component';
import { PLInProgressComponent } from './plInProgress_component';



@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/packingList/pl_wrapper.tpl.html',
})

export class PLWrapperComponent implements AfterViewInit {

    

    @ViewChild('modal1') modal1;
    
    constructor (public _route: Router) {    }

    ngAfterViewInit(): void {  
        this.modal1.modalCompCreated().subscribe((val) => {
            val.closeEvent().subscribe((val) => {
                this.modal1.closePopup();
            });
        });
    }

    changeRoute(choice : string){
        
        console.log("changeRoute()");

        switch(choice){
            case 'pl' : 
                this.modal1.setProperties(
                    {
                    component : PackingListComponent
                    }
                );
                this.modal1.open();
                console.log("pl");
                break;
            case 'inp' : 
                this.modal1.setProperties(
                    {
                    component : PLInProgressComponent
                    }
                );
                this.modal1.open();
                console.log("inp");
                break;
        }
    }

}