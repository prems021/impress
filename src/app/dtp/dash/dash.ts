


import {  Component,  OnInit } from "@angular/core";
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';

import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';



@Component({
  selector: 'app-dash-dtp',
  templateUrl: './dash.html',
  styleUrls: ['./dash.scss']
})
export class Dtp_DashboardComponent implements OnInit {



  public columns_new_work: Columns[];


  fresh_work_count :number = 0;
  
  finished_work_count : number = 0;

  _option : number = 0;
 
  
  public data_new_work = [];
  public data_completed_work = [];
  public configuration: Config;



  constructor(public api: ApiService,private router:Router,private ps:NgxPermissionsService,private ds:DataService) { }

  ngOnInit() {


     this.new_job_list();
     this.finished_job_list();



    this.columns_new_work = [
      { key: 'customerName', title: 'Name' },
      { key: 'address', title: 'Address' },
      { key: 'mob1', title: 'Contact No.' },
      { key: 'email', title: 'Email' },
      { key: 'gst_no', title: 'Gst No' },
    ];



    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;

  }

  logout()
  {
    localStorage.removeItem('token');
    this.ps.flushPermissions();
    this.router.navigate(['login']);
  }



new_job_list() {
   this.api.getDesignWorks().subscribe((data:any) => {  this.data_new_work = data.data; this.fresh_work_count=this.data_new_work.length; console.log('new-work',this.data_new_work) });
  }

  finished_job_list()
  {
    this.api.getDesignWorks_finished().subscribe((data:any) => {  this.data_completed_work = data.data.rows; this.finished_work_count=data.data.count; console.log('finished',this.data_completed_work) });
  }




  onEvent_customer(event) {
    console.log('clickevent',event);
     if(event.event==='onClick')
    {
      this.api.showModal = 'block';

    }


  }


  onEvent_vendor(event) {
    console.log('clickevent',event);
  }


  completed_view()
  {
    this.router.navigate(['/Pressdtp/finished'])
  }
  view_job()
  {
    this.router.navigate(['/Pressdtp/new'])
  }

  hide() {
    this.api.showModal = 'none';
    this.api.displayModal  = 'none';
  }
  customer_table(e: any) {
    console.log('addcustomerevent',e);

    if(e == true)
      {
       // this.customers_list();
      }

  }

  assets_table(e: any) {
    console.log(e);

    if(e == true)
      {
        //this.assets_list();
      }

  }

 // @ViewChild(KeyboardShortcutsComponent) public keyboard: KeyboardShortcutsComponent;


}
