/******************************************************************************
### DOCUMENTATION: (How to use this Component) ###

** Add this to your app.ts **
import { UPSALTCPCComponent } from '../../../../common/apps/assets/angular/altcpc';

** Add the reference in your @NgModule **
@NgModule ({
    ...
    declarations: [
        ...
        UPSALTCPCComponent
    ]
});

** Angular Magic happens and you can use this component in your component **
<ups-alt-cpc></ups-alt-cpc>



*******************************************************************************/
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'ups-alt-cpc',
    templateUrl: 'assets/resources/angular/common/templates/altcpc.tpl.html'
})
export class UPSALTCPCComponent {
    altcpcForm:FormGroup;

    altPaymentMethod:string = 'PayAtStore';

    altPayPaypalSaved:boolean = false;

    constructor(private fb:FormBuilder) {
        this.altcpcForm = fb.group({

        });
    }
    
    setAltPayPaypalSaved(setVal:boolean):void {
        this.altPayPaypalSaved = setVal;
    }
    
    setAltPaymentMethod(setVal:string):void {
        this.altPaymentMethod = setVal;
    }
}
