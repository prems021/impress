


import {  Component,  OnInit } from "@angular/core";
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';

import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';



@Component({
  selector: 'app-dash-plate-set',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Dash_plate_set_Component implements OnInit {



 fresh_work_count :number = 0;


  finished_work_count : number = 0;
  _option : number = 0;
  load_flag : number = 0;



  constructor(public api: ApiService,private router:Router,private ps:NgxPermissionsService,private ds:DataService) { }

  ngOnInit() {

     this.new_job_list();






  }

  logout()
  {
    localStorage.removeItem('token');
    this.ps.flushPermissions();
    this.router.navigate(['login']);
  }







new_job_list() {
   this.api.get_all_work_list_new_plate_set().subscribe((data:any) => {  this.fresh_work_count = data.data.count;this.finished_job_list();  });
  }



  finished_job_list()
  {
    this.api.get_all_work_list_new_plate_set_finished().subscribe((data:any) => {  this.finished_work_count = data.data.count;  this.load_flag = 1; });
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
