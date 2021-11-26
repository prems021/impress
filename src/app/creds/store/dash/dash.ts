




import {  Component,  OnInit } from "@angular/core";
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';

import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';




@Component({
  selector: 'app-dash-store',
  templateUrl: './dash.html',
  styleUrls: ['./dash.scss']
})
export class Dash_store_Component implements OnInit {



 // public columns_new_work: Columns[];
 finished_intent_count :number = 0;
  finished_delivery_count :number = 0;
  active_intent_count : number = 0;
  additional_count : number = 0;
  load_flag : number = 0;
  



  constructor(public api: ApiService,private router:Router,private ps:NgxPermissionsService,private ds:DataService) { }

  ngOnInit() {

    this.new_intent_list();
    //  this.finished_job_list();

  }

  logout()
  {
    localStorage.removeItem('token');
    this.ps.flushPermissions();
    this.router.navigate(['login']);
  }







  new_intent_list() {
  this.api.get_intent_info_untouched().subscribe((data: any) => { console.log('data',data), this.active_intent_count = data.data.length;  this.get_finished_intent_list() });
  }

  get_finished_intent_list()
  {
    this.api.get_intent_info_finished().subscribe((data: any) => { console.log('data',data), this.finished_intent_count = data.data.length; this.load_flag = 1 ; this.finished_additional_paper_requests() });
  }

  finished_additional_paper_requests()
  {

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
