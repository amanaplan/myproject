import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../../../../common/apps/assets/angular/shared';

import { RouterModule, Routes } from '@angular/router';
import { DatepickerModule, TooltipModule, PopoverModule } from 'ngx-bootstrap';
import { PopupService } from '../../../../common/apps/assets/angular/popup_service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** BEGIN App Components */
import { AppComponent }  from './components/route_nbs';
import { nbsComp } from './services/nbs_comp';
import { D3Service } from 'd3-ng2-service';

/** BEGIN Guided flow and Compact View Components */
import { A4NBS_IndexComponent }  from './components/a4_nbsIndex';
import { CompactViewComponent }  from './components/spa_nbs';
import { GFNBSComponent } from './components/gfWrapper_component';
import { NBSWhereFromComponent } from './components/whereFrom_component';
import { NBSWhereToComponent } from './components/whereTo_component';
import { GFModalComponent } from './components/gfModal_component';
import { NonFormModalWrapperComponent } from './components/nonFormsModals/nonFormModal_wrapper';
import { ModalDutiableComponent } from './components/nonFormsModals/modalDutiable_component';
import { ModalInvAddComponent } from './components/nonFormsModals/modalInvAdd_component';
import { ModalInvAddNoClassComponent } from './components/nonFormsModals/modalInvAddNoClass_component';
import { ModalResiCommComponent } from './components/nonFormsModals/modalResiComm_component';
import { NBSWhatComponent } from './components/what_component';
import { AnimateComponent } from './animate/animate.component';
import { NBSWhenComponent } from './components/when_component';
import { NBSIntFormsComponent } from './components/internationalForms_component';
import { NBSDetailsComponent } from './components/details_component';
import { NBSPaymentComponent } from './components/payment_component';
import { NBSScheduleComponent } from './components/schedule_component';
import { NBSConfirmationComponent } from './components/confirmation_component';
import { ProgressTrackerComponent } from './components/progressTracker_component';
import { BalanceBarComponent } from './components/balanceBar_component';
import { InternationalFormsNoComponent } from './components/internationalFormsNo_component';
import { InternationalFormsYesComponent } from './components/internationalFormsYes_component';

/**
 * END Guided flow and Compact View Components
 * BEGIN Forms Components
*/
import { CoreFormComponent } from './components/forms/coreForm_component';
import { UPSModalComponent } from '../../../../common/apps/assets/angular/modal';
//Form Wizard
import { FormsWizWrapperComponent } from './components/forms/forms_wizard/formsWizWrapper_component';
import { FWModalComponent } from './components/forms/forms_wizard/fwModal_component';
import { FormsWizStep1Component } from './components/forms/forms_wizard/formsWizStep1_component';
import { FormsWizStep2_1Component } from './components/forms/forms_wizard/formsWizStep2_1_component';
import { FormsWizStep2_2Component } from './components/forms/forms_wizard/formsWizStep2_2_component';
import { FormsWizStep2_3_0_Component } from './components/forms/forms_wizard/formsWizStep2_3_0_component';
import { FormsWizStep2_3_1_Component } from './components/forms/forms_wizard/formsWizStep2_3_1_component';
import { FormsWizStep2_3_2yes_Component } from './components/forms/forms_wizard/formsWizStep2_3_2yes_component';
import { FormsWizStep2_3_2no_Component } from './components/forms/forms_wizard/formsWizStep2_3_2no_component';
import { FormsWizStep2_4Component } from "./components/forms/forms_wizard/formsWizStep2_4_component";
import { FormsWizStep2_5Component } from "./components/forms/forms_wizard/formsWizStep2_5_component";
import { FormsWizStep2_6Component } from "./components/forms/forms_wizard/formsWizStep2_6_component";
import { FormsWizStep2_7Component } from "./components/forms/forms_wizard/formsWizStep2_7_component";
import { FormsWizStep3Component } from './components/forms/forms_wizard/formsWizStep3_component';
//Packing List
import { PLWrapperComponent } from './components/forms/packingList/plWrapper_component';
import { PackingListComponent } from './components/forms/packingList/pl_component';
import { PLInProgressComponent } from './components/forms/packingList/plInProgress_component';
//Certificate of Origin
import { coWrapperComponent } from './components/forms/certificate_of_origin/coWrapper_component';
import { CertificateOfOrigin } from './components/forms/certificate_of_origin/co_component';
//Commercial Invoice
import { CIWrapperComponent } from './components/forms/commercial_invoice/ciWrapper_component';
import { CommercialInvoiceComponent } from './components/forms/commercial_invoice/ci_component';
//NAFTA
import { NAFTAComponent } from './components/forms/NAFTA/nafta_component';
import { NAFTAWrapperComponent } from './components/forms/NAFTA/naftaWrapper_component';
//EEI
import { EEIWrapperComponent } from './components/forms/EEI/eeiWrapper_component';
import { ElectronicExportComponent } from './components/forms/EEI/eei_component';
//import { EEIRTGInProgComponent } from './components/forms/EEI/eei_RTG_inProg_component';
/**
 * END Forms Components
*/
/** End App Components */

/** Directives */
import { PointIdClick } from '../../../../common/apps/assets/angular/point_id_click';
import { UpsDrawerList } from '../../../../common/apps/assets/angular/drawer_list';
import { UpsHelpBtn } from '../../../../common/apps/assets/angular/help_btn';
import { UpsInfoBtn } from '../../../../common/apps/assets/angular/info_btn';

/** External Components */
import { UPSCACComponent } from '../../../../common/apps/assets/angular/cac';
import { UPSCPCComponent } from '../../../../common/apps/assets/angular/cpc';
import { UPSALTCPCComponent } from '../../../../common/apps/assets/angular/altcpc';
import { UpsDatePicker } from '../../../../common/apps/assets/angular/upsdatepicker';

/** Lookups Concept */
import { LookupsConceptComponent } from './components/lookupsConcept_component';

import { SanitizeHtmlPipe } from './pipes/safehtml';
import { from } from 'rxjs/observable/from';
import { ModalBetaComponent } from './components/nonFormsModals/modalBeta_component';

const appRoutes: Routes = [
    { path: 'compactView', component: CompactViewComponent },
    { path: 'gfWrapper', component: GFNBSComponent },
    { path: 'gfWrapper/whereFrom', component: GFNBSComponent },
    { path: 'gfWrapper/whereTo', component: GFNBSComponent },
    { path: 'gfWrapper/what', component: GFNBSComponent },
    { path: 'gfWrapper/when', component: GFNBSComponent },
    { path: 'gfWrapper/intForms', component: GFNBSComponent},
    { path: 'gfWrapper/addons', component: GFNBSComponent },
    { path: 'gfWrapper/payment', component: GFNBSComponent },
    { path: 'confirmation', component: NBSConfirmationComponent },
    { path: 'forms/pl/packingList', component: PLWrapperComponent },
    { path: 'forms/pl/inProgress', component: PLWrapperComponent },
    { path: 'forms/co/certificate_of_origin', component: coWrapperComponent },
    { path: 'lookupsConcept', component: LookupsConceptComponent },
    { path: 'forms/commercial_invoice', component: CIWrapperComponent},
    { path: 'forms/nafta', component: NAFTAWrapperComponent},
    { path: 'forms/eei', component: EEIWrapperComponent},
    { path: 'forms/test', component: CoreFormComponent },
    { path: 'nonFormsModals', component: NonFormModalWrapperComponent },
    {
        path: 'forms/forms_wizard/formsWiz', component: FormsWizWrapperComponent,
        children: [{
            path: '230',
            component: FormsWizStep2_3_0_Component
        }]
    },
    { path: '**', component: A4NBS_IndexComponent }
];

@NgModule({
    imports : [
        BrowserModule,
        SharedModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
        FormsModule,
        ReactiveFormsModule,
        DatepickerModule.forRoot(),
        BrowserAnimationsModule,
        PopoverModule.forRoot()
    ],
    declarations : [
        AppComponent,
        PointIdClick,
        UpsDrawerList,
        UpsHelpBtn,
        A4NBS_IndexComponent,
        CompactViewComponent,
        GFNBSComponent,
        NBSWhereFromComponent,
        NBSWhereToComponent,
        GFModalComponent,
        ModalDutiableComponent,
        ModalResiCommComponent,
        ModalInvAddComponent,
        NonFormModalWrapperComponent,
        ModalInvAddNoClassComponent,
        NBSWhatComponent,
        AnimateComponent,
        NBSWhenComponent,
        InternationalFormsNoComponent,
        InternationalFormsYesComponent,
        NBSIntFormsComponent,
        NBSDetailsComponent,
        NBSPaymentComponent,
        NBSConfirmationComponent,
        NBSScheduleComponent,
        ProgressTrackerComponent,
        BalanceBarComponent,
        UpsDatePicker,
        UPSCACComponent,
        UPSCPCComponent,
        UPSALTCPCComponent,
        UPSModalComponent,
        FormsWizWrapperComponent,
        FWModalComponent,
        CoreFormComponent,
        FormsWizStep1Component,
        FormsWizStep2_1Component,
        FormsWizStep2_2Component,
        FormsWizStep2_3_0_Component,
        FormsWizStep2_3_1_Component,
        FormsWizStep2_3_2yes_Component,
        FormsWizStep2_3_2no_Component,
        FormsWizStep2_4Component,
        FormsWizStep2_5Component,
        FormsWizStep2_6Component,
        FormsWizStep2_7Component,
        FormsWizStep3Component,
        PLWrapperComponent,
        PackingListComponent,
        PLInProgressComponent,
        coWrapperComponent,
        CertificateOfOrigin,
        CommercialInvoiceComponent,
        CIWrapperComponent,
        LookupsConceptComponent,
        SanitizeHtmlPipe,
        NAFTAWrapperComponent,
        NAFTAComponent,
        EEIWrapperComponent,
        ElectronicExportComponent,
        UpsInfoBtn,
        ModalBetaComponent
    ],
    providers : [
        nbsComp,
        D3Service,
        PopupService
    ],
    entryComponents: [
            FormsWizStep1Component,
            FormsWizStep2_1Component,
            FormsWizStep2_2Component,
            FormsWizStep2_3_0_Component,
            FormsWizStep2_4Component,
            FormsWizStep2_5Component,
            FormsWizStep2_6Component,
            FormsWizStep2_7Component,
            FormsWizStep3Component,
            PackingListComponent,
            PLInProgressComponent,
            CertificateOfOrigin,
            CommercialInvoiceComponent,
            NAFTAComponent,
            ElectronicExportComponent,
            ModalDutiableComponent,
            ModalResiCommComponent,
            ModalInvAddComponent,
            ModalInvAddNoClassComponent,
            ModalBetaComponent
        ],
    bootstrap : [
        AppComponent
    ],
})
export class AppModule {  }
