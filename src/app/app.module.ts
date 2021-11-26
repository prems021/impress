import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastrModule } from 'ngx-toastr';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { TableModule } from 'ngx-easy-table';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { NgEasyValidationModule } from 'ng-easy-validation';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';

import {MatFormFieldModule} from '@angular/material/form-field';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MaxLengthDirective } from './directive/max_length/main';

import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dash/dash';
import { HomeComponent } from './pages/home/home';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';


import { OfficeDashboardComponent } from './creds/office/dash/dash';
import { Add_user_Component } from './creds/office/user/add/add';
import { Customer_UpdateComponent } from './creds/office/user/update/update';
import { newOrder_Component } from './creds/office/new_work/new-work';
import { Office_View_work_main } from './creds/office/view_work/main';


import { Dtp_DashboardComponent } from './creds/dtp/dash/dash';
import { Dtp_active_work_Component, Viewjob_dets_Component } from './creds/dtp/view/new/new';
import { Dtp_finished_work_Component } from './creds/dtp/view/finished/finished';

import { Dash_plan_Component } from './creds/plan/dash/dash';
import { Plan_active_work_in_Component,Job_plan_action_Component,Job_plan_action_split_Component } from './creds/plan/new_works_in/main';
import { Plan_active_work_in_Component_fin,Job_plan_action_Component_fin,Job_plan_action_split_Component_fin} from './creds/plan/finished_works/main';
import { Plan_active_work_out_Component } from './creds/plan/new_works_out/main';
import { Paperinhand_plan } from './creds/plan/paper_in_hand/main';





import { Dash_plate_set_Component } from './creds/plate-set/dash/main';
import { Plate_active_work_Component,plateset_action_Component } from './creds/plate-set/new-work/new';

import { Plate_active_work_Component_finished , plateset_action_Component_finished} from './creds/plate-set/finished-work/main';
import { Plate_store_master_Component } from './creds/plate-set/store/master/main';


import { Dash_store_Component } from './creds/store/dash/dash';
import { Active_intent_Component } from './creds/store/intents/main';
import { View_intent_details_Component } from './creds/store/intent-detail/main';
import { AddPaperComponent } from './creds/store/master/add-paper/main';
import { PaperWithCompany_master_Component } from './creds/store/master/paper-master/main';


import { Dash_print_set_Component } from './creds/print/dash/dash';
import { Print_active_work_Component,print_action_Component,print_view_machines_Component } from './creds/print/new/main';


import { AppService } from './services/app.service';
import { ApiService } from './services/api.service';
import { Service_worker } from './services/sw.service';
import { DataService } from './services/data.service';
import { HttpErrorHandler } from './services/error-handler';
import { MessageService } from './services/message';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Data_loader_Component } from './components/data-loader/main';
import { Work_detail_loader_Component } from './components/work-detail/main';
import { Update_order_Component } from './creds/office/edit-order/edit';

import { Dash_Cutting_Component } from './creds/cutting/dash/main';
import {Cutting_active_work_Component, Cutting_action_Component } from './creds/cutting/new/main';

@NgModule({
  declarations: [
    AppComponent,LoginComponent,DashboardComponent,HomeComponent,SidebarComponent,FooterComponent,NavbarComponent,OfficeDashboardComponent,
    Add_user_Component,Customer_UpdateComponent,newOrder_Component,MaxLengthDirective,Office_View_work_main,Data_loader_Component,Work_detail_loader_Component,
    Update_order_Component,Dtp_DashboardComponent,Dtp_active_work_Component,Viewjob_dets_Component,Dtp_finished_work_Component,Dash_plan_Component,
    Plan_active_work_in_Component,Job_plan_action_Component,Job_plan_action_split_Component,Plan_active_work_in_Component_fin,
    Job_plan_action_Component_fin,Job_plan_action_split_Component_fin,Plan_active_work_out_Component,Dash_plate_set_Component,
    plateset_action_Component,View_intent_details_Component,Plate_store_master_Component,print_view_machines_Component,
    Plate_active_work_Component,Plate_active_work_Component_finished,plateset_action_Component_finished,Dash_store_Component,
    Active_intent_Component,Paperinhand_plan,AddPaperComponent,PaperWithCompany_master_Component,Print_active_work_Component,
    Dash_print_set_Component,Dash_Cutting_Component,Cutting_active_work_Component,Cutting_action_Component,print_action_Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,FormsModule,
    BrowserAnimationsModule,NguiAutoCompleteModule,
    HttpClientModule,MatFormFieldModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    TableModule,AngularMyDatePickerModule,
    NgxPermissionsModule.forRoot(),
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    KeyboardShortcutsModule.forRoot(),
    NgEasyValidationModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [AppService,ApiService,DataService,HttpErrorHandler,MessageService,Service_worker,CurrencyPipe,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
