//MODAL COMPONENT IS UNDER CONSTRUCTION; DO NOT USE FOR PRODUCTION!!!!

import { Component } from '@angular/core';
   import { ConfirmComponent } from './confirm.component';
   import { DialogService } from "ng2-bootstrap-modal";

   @Component({
     selector: 'app',
     template: `
         <button class="ups-cta ups-cta_secondary" (click)=showConfirm()>Show Modal</button>
     `
   })
   export class SampleModalComponent {
       constructor(private dialogService:DialogService) {}
       showConfirm() {
           let disposable = this.dialogService.addDialog(ConfirmComponent, {
               title:'Report Preview',
               message:'Report Preview Demo'})
            //    .subscribe((isConfirmed)=>{
            //        //We get dialog result
            //        if(isConfirmed) {
            //            alert('accepted');
            //        }
            //        else {
            //            alert('declined');
            //        }
            //    });
           //We can close dialog calling disposable.unsubscribe();
           //If dialog was not closed manually close it by timeout
        //    setTimeout(()=>{
        //        disposable.unsubscribe();
        //    },10000);
       }
   }
//MODAL COMPONENT IS UNDER CONSTRUCTION; DO NOT USE FOR PRODUCTION!!!!
