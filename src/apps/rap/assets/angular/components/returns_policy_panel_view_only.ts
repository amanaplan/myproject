import { Component } from '@angular/core';
declare var $:any;
@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_policy_panel_view_only.tpl.html'
})
export class ReturnsPolicyPanelViewOnlyComponent {

    //makeFieldsDisabled: boolean = false;
    /*Method #1: Create a jQuery function that targets all inputs, select boxes, etc and give them a property and attribute of disabiled*/
    // testFunction(): void {
    //     //$('input, select').prop('disabled',true).attr('aria-disabled',true);
    //     // $('body').find('input[type="text"], input[type="radio"], input[type="checkbox"], input[type="search"], select').prop('disabled',true).attr('aria-disabled',true);
    //     //$("input[type='checkbox']").prop('disabled',true).attr('aria-disabled',true);
    //     //$("input[type='text']").prop('disabled',true);
    // }

    // ngOnInit() {
    //     //this.testFunction();
    //     this.makeFieldsDisabled = true;
    // }

    // test(): void {
    //     this.testFunction();
    // }

}
