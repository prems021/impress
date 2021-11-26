


import {  Component,  OnInit } from "@angular/core";
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';

import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';



@Component({
  selector: 'app-dash-plan',
  templateUrl: './dash.html',
  styleUrls: ['./dash.scss']
})
export class Dash_plan_Component implements OnInit {



 // public columns_new_work: Columns[];
  fresh_work_count_in :number = 0;
  fresh_work_count_out :number = 0;

  finished_work_count : number = 0;
  _option : number = 0;

//   public data_new_work = [];
//   public data_completed_work = [];
  //public configuration: Config;



  constructor(public api: ApiService,private router:Router,private ps:NgxPermissionsService,private ds:DataService) { }

  ngOnInit() {

     this.new_job_list();
     this.new_job_list_out();
     this.finished_job_list();
     this.additional_paper_requests();


    // this.columns_new_work = [
    //   { key: 'customerName', title: 'Name' },
    //   { key: 'address', title: 'Address' },
    //   { key: 'mob1', title: 'Contact No.' },
    //   { key: 'email', title: 'Email' },
    //   { key: 'gst_no', title: 'Gst No' },
    // ];



    // this.configuration = { ...DefaultConfig };
    // this.configuration.searchEnabled = true;

  }

  logout()
  {
    localStorage.removeItem('token');
    this.ps.flushPermissions();
    this.router.navigate(['login']);
  }







new_job_list() {
   this.api.get_all_plan_work_list().subscribe((data:any) => {  this.fresh_work_count_in = data.data.count;  });
  }

  new_job_list_out() {
    this.api.get_all_plan_work_list_out().subscribe((data:any) => {  this.fresh_work_count_out = data.data.count;  });
   }


  finished_job_list()
  {
    //this.api.getDesignWorks_finished().subscribe((data:any) => {  this.data_completed_work = data.data.rows; this.finished_work_count=data.data.count; console.log('finished',this.data_completed_work) });
  }

  additional_paper_requests()
  {

  }









  completed_view()
  {
    this.router.navigate(['/Pressdtp/finished'])
  }
  view_job()
  {
    this.router.navigate(['/Pressdtp/new'])
  }








}
