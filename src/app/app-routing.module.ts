import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dash/dash';
import { HomeComponent } from './pages/home/home';
import { OfficeDashboardComponent } from './creds/office/dash/dash';
import { newOrder_Component } from './creds/office/new_work/new-work';
import { Office_View_work_main } from './creds/office/view_work/main';
import { Update_order_Component } from './creds/office/edit-order/edit';

import { Dtp_DashboardComponent } from './creds/dtp/dash/dash';
import { Dtp_active_work_Component } from './creds/dtp/view/new/new';
import { Dtp_finished_work_Component } from './creds/dtp/view/finished/finished';

import { Dash_plan_Component } from './creds/plan/dash/dash';
import { Plan_active_work_in_Component } from './creds/plan/new_works_in/main';
import { Plan_active_work_in_Component_fin } from './creds/plan/finished_works/main';
import { Plan_active_work_out_Component } from './creds/plan/new_works_out/main';
import { Paperinhand_plan } from './creds/plan/paper_in_hand/main';


import { Dash_plate_set_Component } from './creds/plate-set/dash/main';
import { Plate_active_work_Component } from './creds/plate-set/new-work/new';
import { Plate_active_work_Component_finished } from './creds/plate-set/finished-work/main';
import { Plate_store_master_Component } from './creds/plate-set/store/master/main';

import { Dash_store_Component } from './creds/store/dash/dash';
import { Active_intent_Component } from './creds/store/intents/main';
import { AddPaperComponent } from './creds/store/master/add-paper/main';
import { PaperWithCompany_master_Component } from './creds/store/master/paper-master/main';

import { Dash_print_set_Component } from './creds/print/dash/dash';
import { Print_active_work_Component } from './creds/print/new/main';


import { Dash_Cutting_Component } from './creds/cutting/dash/main';
import { Cutting_active_work_Component } from './creds/cutting/new/main';
const routes: Routes = [
  {path: '',   redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'Pressoffice', component: HomeComponent,
  children: [
      {path: '',   redirectTo: 'Pressoffice/dash', pathMatch: 'full'},
      {path: 'dash',component: OfficeDashboardComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressoffice', 'Admin'] } }  } ,
      {path: 'new',component: newOrder_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressoffice', 'Admin'] } }  } ,
      {path: 'view',component: Office_View_work_main, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressoffice', 'Admin'] } }  } ,
      {path: 'edit-order',component: Update_order_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressoffice', 'Admin'] } }  } ,
      {path: 'update-invoice',component: HomeComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressoffice', 'Admin'] } }  } ,
      {path: 'update-company-dets',component: HomeComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressoffice'] } } },
      {path: 'test',component: HomeComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressoffice'] } } },
      ],
    canActivate: [NgxPermissionsGuard],  data: { permissions: { except: 'guest' }
  }
   },


   {path: 'Pressdtp', component: HomeComponent,
   children: [
       {path: '',   redirectTo: 'Pressdtp/dash', pathMatch: 'full'},
       {path: 'dash',component: Dtp_DashboardComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressdtp', 'Admin'] } }  } ,
       {path: 'new',component: Dtp_active_work_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressdtp', 'Admin'] } }  } ,
       {path: 'finished',component: Dtp_finished_work_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressdtp', 'Admin'] } }  } ,
       ],
     canActivate: [NgxPermissionsGuard],  data: { permissions: { except: 'guest' }
   }
    },


    {path: 'Pressplan', component: HomeComponent,
    children: [
        {path: '',   redirectTo: 'Pressplan/dash', pathMatch: 'full'},
        {path: 'dash',component: Dash_plan_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressplan', 'Admin'] } }  } ,
        {path: 'new-in',component: Plan_active_work_in_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressplan', 'Admin'] } }  } ,
        {path: 'new-out',component: Plan_active_work_out_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressplan', 'Admin'] } }  } ,
        {path: 'approvals',component: Dtp_active_work_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressplan', 'Admin'] } }  } ,
        {path: 'paper-in-hand',component: Paperinhand_plan, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressplan', 'Admin'] } }  } ,
        {path: 'finished',component: Plan_active_work_in_Component_fin, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressplan', 'Admin'] } }  } ,
        ],
      canActivate: [NgxPermissionsGuard],  data: { permissions: { except: 'guest' }
    }
     },

     {path: 'Pressplate', component: HomeComponent,
     children: [
         {path: '',   redirectTo: 'Pressplate/dash', pathMatch: 'full'},
         {path: 'dash',component: Dash_plate_set_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressplate', 'Admin'] } }  } ,
         {path: 'new',component: Plate_active_work_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressplate', 'Admin'] } }  } ,
         {path: 'finished',component: Plate_active_work_Component_finished, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressplate', 'Admin'] } }  } ,
         {path: 'store-master',component: Plate_store_master_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressplate', 'Admin'] } }  } ,
         
         ],
       canActivate: [NgxPermissionsGuard],  data: { permissions: { except: 'guest' }
     }
      },

      
     {path: 'Pressprint', component: HomeComponent,
     children: [
         {path: '',   redirectTo: 'Pressprint/dash', pathMatch: 'full'},
         {path: 'dash',component: Dash_print_set_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressprint', 'Admin'] } }  } ,
         {path: 'new',component: Print_active_work_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressprint', 'Admin'] } }  } ,
         {path: 'finished',component: Plate_active_work_Component_finished, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressprint', 'Admin'] } }  } ,
         {path: 'store-master',component: Plate_store_master_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Pressprint', 'Admin'] } }  } ,
         
         ],
       canActivate: [NgxPermissionsGuard],  data: { permissions: { except: 'guest' }
     }
      },

         
     {path: 'Presscut', component: HomeComponent,
     children: [
         {path: '',   redirectTo: 'Presscut/dash', pathMatch: 'full'},
         {path: 'dash',component: Dash_Cutting_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Presscut', 'Admin'] } }  } ,
         {path: 'new',component: Cutting_active_work_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Presscut', 'Admin'] } }  } ,
         {path: 'finished',component: Plate_active_work_Component_finished, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Presscut', 'Admin'] } }  } ,
         {path: 'store-master',component: Plate_store_master_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Presscut', 'Admin'] } }  } ,         
         ],
       canActivate: [NgxPermissionsGuard],  data: { permissions: { except: 'guest' }
     }
      },

      



      {path: 'Presspaper', component: HomeComponent,
      children: [
          {path: '',   redirectTo: 'Presspaper/dash', pathMatch: 'full'},
          {path: 'dash',component: Dash_store_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Presspaper', 'Admin'] } }  } ,
          {path: 'new',component: Active_intent_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Presspaper', 'Admin'] } }  } ,
          {path: 'add-paper',component: PaperWithCompany_master_Component, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Presspaper', 'Admin'] } }  } ,
          {path: 'add-to-store',component: AddPaperComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Presspaper', 'Admin'] } }  } ,
          {path: 'finished',component: Plate_active_work_Component_finished, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Presspaper', 'Admin'] } }  } ,
          ],
        canActivate: [NgxPermissionsGuard],  data: { permissions: { except: 'guest' }
      }
       },




   {path: 'Pressadmin', component: HomeComponent,
   children: [
       {path: '',   redirectTo: 'Pressadmin/dash', pathMatch: 'full'},
       {path: 'dash',component: DashboardComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } }  } ,
       {path: 'new',component: HomeComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } }  } ,
       {path: 'update-invoice',component: HomeComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } }  } ,
       {path: 'update-company-dets',component: HomeComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },
       {path: 'test',component: HomeComponent, canActivate: [NgxPermissionsGuard], data: { permissions: {  only: ['Admin'] } } },
       ],
     canActivate: [NgxPermissionsGuard],  data: { permissions: { except: 'guest' }
   }
    },



  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }



