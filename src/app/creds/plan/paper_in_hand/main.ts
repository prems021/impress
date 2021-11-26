

import { Component, OnInit,ViewChild,ChangeDetectionStrategy } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';



import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Columns, Config, DefaultConfig,API,APIDefinition } from 'ngx-easy-table';


export interface work_list {
  si : number,
  Qty: number ;
  paperName : string;
  building : string;
  paper_type : string;

}

@Component({
  selector: 'app-paper-in-hand',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Paperinhand_plan implements OnInit {

  searchForm : FormGroup;

  public columns_new_work: Columns[];

  load_flag : number = 0;
  list_data : work_list[] = [];
  key : string = ''
  public data_new_work = [];
  public configuration: Config;

  @ViewChild('table', { static: true }) table: APIDefinition;

  constructor( private router: Router, private api : ApiService,private fb: FormBuilder,
  private _httpClient: HttpClient) { }

  ngOnInit() {
    this.columns_new_work = [
      { key: 'building', title: 'Building' },
      { key: 'paper_type', title: 'Paper Type' },
      { key: 'paperName', title: 'Paper Name' },
      { key: 'Qty', title: 'Quantity' },
        ];



    this.configuration = { ...DefaultConfig };

    this.fetchData();

    this.searchForm = this.fb.group({
      Key_code: ['', [Validators.required]]

    });


  }


  onChange(): void {
    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: this.searchForm.controls.Key_code.value,
    });
  }

  fetchData() {
    this.load_flag = 0;
    this.api.get_paper_in_hand_plan().subscribe((result: any) => {
    this.make_data(result)
  });
}

make_data(data:any)
{

  console.log('data',data)


   while(this.list_data.length > 0)
   {
    this.list_data.pop();
   }

   this.data_new_work = [];
   for(var i=0;i<data.count;i++)
    {
      console.log('res',this.list_data)

    if(this.list_data.length < data.count)
    {
      this.list_data.push({"si":0,"Qty":0,"paperName":'',"building":'',"paper_type":''});
    }

      this.list_data[i].si = i + 1;
      if(data.rows[i].building_flag == 1)
      {
        this.list_data[i].building = 'Main building';
      }

      if(data.rows[i].building_flag == 1)
      {
        this.list_data[i].building = 'Main building';
      }
      if(data.rows[i].building_flag == 2)
      {
        this.list_data[i].building = 'Annex building';
      }

      if(data.rows[i].paper_category_id == 1)
      {
        this.list_data[i].paper_type = 'Roll';
      }
      if(data.rows[i].paper_category_id == 2)
      {
        this.list_data[i].paper_type = 'Sheet';
      }

     this.list_data[i].Qty = data.rows[i].Quantity;
     this.list_data[i].paperName = data.rows[i].Paper_master.Papertype +  data.rows[i].Paper_master.Size + data.rows[i].Paper_master.Gsm;


   }

     console.log('finally',this.list_data)
     this.data_new_work = this.list_data;




}


}




