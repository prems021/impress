import { Component, OnInit, ViewChild ,AfterViewInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';


import {  Observable, of as observableOf } from 'rxjs';


import {MatPaginator} from '@angular/material/paginator';

import {MatTableDataSource} from '@angular/material/table';

import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { response,RootObject,new_data } from './model';


export interface CatAr {
  Catid: number;
  Category: string;
}

export interface PaperApi {
  data: PaperData[];
  total_count: number;
}



export interface Finish_intent {
  rows: FinishData[];
  count: number;
}


export interface FinishData {
  qty : number;
  paper_size : string;
  gsm : number;
  company : string;
  paper_type : string;
  category: string;
}

export interface PaperData {
  Paperid: number;
  PaprCompny: string;
  PaprType: string;
  PaprSize: string;
  PaprGsm: number;
  PaprQuantity: number;
  PaprCategory: string;
}

export interface Allpaper {
  paper_id: number;
  Papertype: string;
  Gsm: number;
  Size: string;
}

export interface Allcompany {
  Company_id: number;
  Company_name: string;
}


@Component({
  selector: 'app-add-paper',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class AddPaperComponent implements OnInit , AfterViewInit {

  paperModel: FormGroup;
  roots :  RootObject [] = [];

  public paperinfo = new MatTableDataSource<new_data>();
  view_flag : boolean = false;
  mock_data : FinishData[] = [];
  fresh : response[];
  addpapercategory: CatAr[];

  displayedColumns: string[] = ['index', 'cat', 'Company', 'PaperType', 'PaperSize', 'Gsm', 'Quantity'];
  company: any;
  pa : string;
  list_data : new_data[] = []
  resultsLength = 0;
  load_flag : number = 0
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  options: Allpaper[] = [];
  filteredOptions: Observable<Allpaper[]>;

  constructor(private router: Router, private apiService: ApiService,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, private _httpClient: HttpClient) { }

  ngOnInit() {
  //  this.getaddpaperCategory();
    this.paperModel = this.formBuilder.group({
      PaperType: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      Quantity: ['', [Validators.required]],
      Company: ['', [Validators.required]],
    });
    this.fetchPaper();
    this.fetchComapny();


  }


  ngAfterViewInit() {
    this.paperinfo.paginator = this.paginator;
    this.paperinfo.sort = this.sort;



    this.fetchData();

  }




  fetchData() {
    this.load_flag = 0;


    this.apiService.getPaperStock().subscribe((result: any) => {
      console.log('rest',result)
      this.make_data(result)
  });

  }

  fetchPaper() {
    this.apiService.getpaperType().subscribe((result: any) => {
        console.log('rest',result)
      this.options = result['data'];
    });
  }

  fetchComapny() {
    this.apiService.get_all_company_list().subscribe((result: any) => {
      this.company = result['data'];
      console.log('company',this.company )
    });
  }

  openSnackbar(msg: string, btn: string) {
    this.snackBar.open(msg, btn, {
      duration: 2000,
      panelClass: ['blue-snackbar']
    });
  }

  deleteItem(id: string) {

  }

  getaddpaperCategory() {

  }
  addpaper() {

    console.log(this.paperModel.value);

    if (this.paperModel.valid) {

       this.apiService.add_paper_to_stock(this.paperModel.value).subscribe((paper: any) => {
         this.res_(paper);
         });

      this.paperModel.reset();

    } else {
      alert('Stock not added');
      this.paperModel.reset();
    }
  }
  res_(data:any)
  {
    this.openSnackbar(data.msg, '');
    this.ngAfterViewInit();
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paperinfo.filter = filterValue.trim().toLowerCase();
    if (this.paperinfo.paginator) {
      this.paperinfo.paginator.firstPage();
    }
}






  make_data(data:any)
  {
 console.log('datya',data)
    this.roots = data;

    while(this.list_data.length > 0)
    {
     this.list_data.pop();
    }

    for(var i = 0 ; i< this.roots.length;i++)
    {
      console.log('i',i);



        this.list_data.push({"id":i+1,"qty":0,"type":'',"size":'',"gsm":'',"cat":'',"company":''});




      this.list_data[i].id = i + 1;
      this.list_data[i].qty = data[i].quantity;
      this.list_data[i].size = data[i].Paper_master.Size;
      this.list_data[i].gsm =  data[i].Paper_master.Gsm;

      this.list_data[i].type =  data[i].Paper_master.Papertype;
      if(data[i].paper_category_id == 1)
      {
        this.list_data[i].cat = 'Roll'
      }
      else{
        this.list_data[i].cat = 'Sheet'
      }
      this.list_data[i].company =  data[i].company_list.Company_name;

    }
    this.paperinfo.data = this.list_data;
    console.log('table-',this.paperinfo.data);
    this.load_flag = 1;
    }





  }






