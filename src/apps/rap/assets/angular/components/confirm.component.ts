//DO NOT INCLUDE FOR PRODUCTION
import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({
    selector: 'confirm',
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/sample_modal.tpl.html'
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> {
  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }
}
//DO NOT INCLUDE FOR PRODUCTION
