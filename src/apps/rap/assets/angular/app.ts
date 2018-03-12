import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule, TooltipModule } from 'ngx-bootstrap'; // Needed for DatePicker
import { PopupService } from '../../../../common/apps/assets/angular/popup_service'; //Needed for DatePicker

import { AppComponent }  from './components/route_main';
import { ReturnsPolicyPanelComponent }  from './components/returns_policy_panel';
import { ReturnsPolicyHomeComponent }  from './components/returns_policy_home';
import { ReturnsPolicyManagerComponent } from './components/returns_policy_manager';
import { ReturnsPolicyManagerContentComponent } from './components/returns_policy_manager_content';
import { UniversalReturnRulesComponent } from './components/universal_return_rules';
import { ReturnsPolicyPanelEditComponent } from './components/returns_policy_panel_edit';
import { ReturnsPolicyPanelCreateComponent } from './components/returns_policy_panel_create';
import { ReturnsPolicyDeletePolicyModalComponent } from './components/returns_policy_delete_policy_modal';
import { ReturnsPolicyPanelViewOnlyComponent } from './components/returns_policy_panel_view_only';
import { HomePanelComponent }  from './components/home';
import { ReturnsHistoryComponent } from './components/returns_history';
import { ReturnsHistoryCreateReportComponent } from './components/returns_history_create_report';
import { ReturnsHistoryReportPreviewComponent } from './components/returns_history_report_preview';
import { IneligibleReturnsComponent } from './components/ineligible_returns';
import { IneligibleReturnsPolicyDetComponent } from './components/ineligible_returns_policy_det';
import { IneligibleReturnsCompleteComponent } from './components/ineligible_returns_complete';
import { ReturnsAdminComponent } from './components/returns_admin';
import { ReturnsAdminAccountsComponent } from './components/returns_admin_accounts';
import { ReturnsAdminInviteComponent } from './components/returns_admin_invite';
import { ReturnsAdminEditComponent } from './components/returns_admin_edit';
import { ReturnsAdminDeleteComponent } from './components/returns_admin_delete';
import { ReturnsAdminCreateNewUserComponent } from './components/returns_admin_create_new_user';
import { ReturnsAdminRemoveUserModalComponent } from './components/returns_admin_remove_user_modal';
import { ReturnsAdminCreateEditFormComponent } from './components/returns_admin_create_edit_form';
import { ReturnsMerchantPluginComponent } from './components/returns_merchant_plugin';
import { ReturnsMerchantPluginCreateAndNameNewPluginComponent } from './components/returns_merchant_plugin_create_and_name_new_plugin';
import { ReturnsMerchantPluginCreateNewPluginPolicyComponent } from './components/returns_merchant_plugin_create_new_plugin_policy';
import { ReturnsMerchantPluginCreatePluginDetailComponent } from './components/returns_merchant_plugin_create_plugin_detail_page';
import { ReturnsMerchantPluginReturnsManagerComponent } from './components/returns_merchant_plugin_returns_manager';
import { ReturnsMerchantPluginProductListComponent } from './components/returns_merchant_plugin_product_list';


import { PageTitle } from '../../../../common/apps/assets/angular/pageTitle';
import { SharedModule } from '../../../../common/apps/assets/angular/shared';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UPSModalComponent } from '../../../../common/apps/assets/angular/modal'; //New Angular 2/4 Modal
import { OrderByPipe } from '../../../../common/apps/assets/angular/sort';

import { UpsDrawerList } from '../../../../common/apps/assets/angular/drawer_list';
import { UpsDrawer } from '../../../../common/apps/assets/angular/drawer';
import { UpsHelpBtn } from '../../../../common/apps/assets/angular/help_btn';
import { UpsInfoBtn } from '../../../../common/apps/assets/angular/info_btn';
import { PointIdClick } from '../../../../common/apps/assets/angular/point_id_click';
import { UpsDatePicker } from '../../../../common/apps/assets/angular/upsdatepicker'; // Needed for DatePicker

import { HttpModule } from '@angular/http';

const appRoutes: Routes = [
    {
        path: 'administration/users/inviteUser',
        component: ReturnsAdminInviteComponent
    },
    {
        path: 'administration/users/createUser',
        component: ReturnsAdminCreateNewUserComponent
    },
    {
        path: 'administration/users/edit',
        component: ReturnsAdminEditComponent
    },
    {
        path: 'administration/users/delete',
        component: ReturnsAdminDeleteComponent
    },
    {
        path: 'administration/accounts',
        component: ReturnsAdminAccountsComponent
    },
    {
        path: 'administration/users',
        component: ReturnsAdminComponent
    },
    {
        path: 'returnsPolicies',
        component: ReturnsPolicyHomeComponent
    },
    {
        path: 'returnsPolicies/viewPolicy',
        component: ReturnsPolicyPanelViewOnlyComponent
    },
    {
        path: 'returnsPolicies/returnsManager',
        component: ReturnsPolicyManagerComponent
    },
    {
        path: 'returnsPolicies/returnsManager/universalReturnRules',
        component: UniversalReturnRulesComponent

    },
    {
        path: 'returnsPolicies/createPolicy',
        component: ReturnsPolicyPanelCreateComponent
    },
    {
        path: 'returnsPolicies/editPolicy',
        component: ReturnsPolicyPanelEditComponent
    },
    {
        path: 'returnsHistory',
        component: ReturnsHistoryComponent
    },
    {
        path: 'returnsHistory/createReport',
        component: ReturnsHistoryCreateReportComponent
    },
    {
        path: 'returnsHistory/createReport/reportPreview',
        component: ReturnsHistoryReportPreviewComponent
    },
    {
        path: 'ineligibleReturns',
        component: IneligibleReturnsComponent
    },
    {
        path: 'ineligibleReturns/complete',
        component: IneligibleReturnsCompleteComponent
    },
    {
        path: 'ineligibleReturns/policyDetails',
        component: IneligibleReturnsPolicyDetComponent
    },
    {
        path: 'merchantPlugIn',
        component: ReturnsMerchantPluginComponent
    },
    {
        path: 'merchantPlugIn/createNamePlugIn',
        component: ReturnsMerchantPluginCreateAndNameNewPluginComponent
    },
    {
        path: 'merchantPlugIn/createNamePlugIn/createPolicy',
        component: ReturnsMerchantPluginCreateNewPluginPolicyComponent
    },
    {
        path: 'merchantPlugIn/createPlugInDetail/createPolicy',
        component: ReturnsMerchantPluginCreateNewPluginPolicyComponent
    },
    {
        path: 'merchantPlugIn/createPlugInDetail',
        component: ReturnsMerchantPluginCreatePluginDetailComponent

    },
    {
        path: 'merchantPlugIn/returnsManager',
        component: ReturnsMerchantPluginReturnsManagerComponent
    },
    {
        path: 'merchantPlugIn/returnsManager/universalReturnRules',
        component: UniversalReturnRulesComponent

    },
    {
        path: 'merchantPlugIn/createPlugInDetail/productList',
        component: ReturnsMerchantPluginProductListComponent
    },
    {
        path: '**',
        component: HomePanelComponent
    }
];

@NgModule({
    imports : [
        BrowserModule,
        SharedModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
        FormsModule,
        ReactiveFormsModule,
        DatepickerModule.forRoot(), //Needed for DatePicker
        HttpModule
    ],
    declarations : [
        AppComponent,
        ReturnsPolicyPanelComponent,
        ReturnsPolicyHomeComponent,
        ReturnsPolicyManagerComponent,
        ReturnsPolicyManagerContentComponent,
        UniversalReturnRulesComponent,
        ReturnsPolicyPanelEditComponent,
        ReturnsPolicyPanelCreateComponent,
        ReturnsPolicyDeletePolicyModalComponent,
        ReturnsPolicyPanelViewOnlyComponent,
        ReturnsAdminRemoveUserModalComponent,
        ReturnsAdminComponent,
        HomePanelComponent,
        UpsDrawerList,
        UpsDrawer,
        UpsDatePicker, // Needed for DatePicker
        UpsHelpBtn,
        UpsInfoBtn,
        ReturnsHistoryComponent,
        ReturnsHistoryCreateReportComponent,
        ReturnsHistoryReportPreviewComponent,
        IneligibleReturnsComponent,
        IneligibleReturnsPolicyDetComponent,
        IneligibleReturnsCompleteComponent,
        ReturnsAdminInviteComponent,
        ReturnsAdminAccountsComponent,
        ReturnsAdminEditComponent,
        ReturnsAdminDeleteComponent,
        ReturnsAdminCreateNewUserComponent,
        ReturnsAdminCreateEditFormComponent,
        ReturnsMerchantPluginComponent,
        ReturnsMerchantPluginCreateAndNameNewPluginComponent,
        ReturnsMerchantPluginCreateNewPluginPolicyComponent,
        ReturnsMerchantPluginCreatePluginDetailComponent,
        ReturnsMerchantPluginReturnsManagerComponent,
        ReturnsMerchantPluginProductListComponent,
        PointIdClick,
        UPSModalComponent, //New Angular 2/4 Modal
        PageTitle,
        OrderByPipe
    ],
    providers : [
        PopupService // Needed for DatePicker
    ],
     entryComponents: [
       ReturnsPolicyDeletePolicyModalComponent,
       ReturnsAdminRemoveUserModalComponent
     ],
    bootstrap : [
        AppComponent
    ],
})
export class AppModule {}
