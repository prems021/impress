import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import {  MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';

export interface PaperD {
  Paper_id: number;
  Papertype: string;
  Gsm: number;
  Size: string;
}

export interface Comp {
  Comapany_id: number;
  Company_name: string;
}

export interface PaperApi {
  data: PaperData[];
  total_count: number;
}

export interface PaperData {
  id: number;
  Papertype: string;
  Size: string;
  Gsm: number;
}



export interface CompanyApi {
  data: CompanyData[];
  total_count: number;
}

export interface CompanyData {
  Company_id: number;
  Company_name: string;
}

@Component({
  selector: 'app-paper-with-company',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class PaperWithCompany_master_Component implements OnInit {


  papermaster: FormGroup;
  addform : FormGroup;
  paperData: PaperD;
  comp: Comp;
  
  load_flag : number = 0;


  public paper_colum = ['index', 'Papertype', 'Gsm', 'Size'];
  public company_colum  = ['index', 'Company_name'];

  companyinfo = new MatTableDataSource<CompanyData>();
  paper_list = new MatTableDataSource<PaperData>();
  displayedColumns: string[] = ['index', 'PaperSize', 'PaperType','Gsm'];
  displayedColumns_c: string[] = ['index', 'Company_name'];
  resultsLength = 0;
  macLength = 0;





  // @ViewChild('paginator_c', { static: true }) paginator_cp: MatPaginator;
  // @ViewChild('paginator_p', { static: true }) paginator_pp: MatPaginator;

  // @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginator_c: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort_c: MatSort;
  
  @ViewChild(MatPaginator, { static: true }) paginator_p: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort_p: MatSort;

  constructor(private router: Router, private apiService: ApiService,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, private _httpClient: HttpClient) { }

  ngOnInit() {
    this.papermaster = this.formBuilder.group({
      Papertype: ['', [Validators.required]],
      Gsm: ['', [Validators.required]],
      Size: ['', [Validators.required]]     
    });

    this.addform = this.formBuilder.group({
      Company_name: ['']
    }),

    this.paper_list.paginator = this.paginator_p;


    this.companyinfo.paginator = this.paginator_c;



    this.fetchData();
    this.fetchCompany();
  }

  // public doFilter_p = (value: string) => {
  //   this.paper_list.filter = value.trim().toLocaleLowerCase();
  // }

  // public doFilter_c = (value: string) => {
  //   this.companyinfo.filter = value.trim().toLocaleLowerCase();
  // }

  fetchData(){
 
    this.apiService.getPaperData().subscribe((result: any) => {
      this.paper_list.data = result['data'];
      console.log('papers.........', this.paper_list.data );
      this.macLength = this.paper_list.data.length;
      this.load_flag = 1;
    
    });
  }

  fetchCompany(){
   
    this.apiService.getCompanyData().subscribe((result: any) => {
     this.companyinfo.data = result['data'];    
      this.resultsLength = this.companyinfo['data']['length'];   
      
    });
  }

  openSnackbar(msg: string, btn: string) {
    this.snackBar.open(msg, btn, {
      duration: 2000,
      panelClass: ['blue-snackbar']
    });
  }

  addpaper() {
    if (this.papermaster.valid) {
      this.paperData = {
        Paper_id: null,
        Papertype: this.papermaster.get('Papertype').value,
        Gsm: this.papermaster.get('Gsm').value,
        Size: this.papermaster.get('Size').value,
      };
      this.apiService.add_paper_to_master(this.paperData).subscribe((result: any) => {
        if (result['success'] === true) {
          this.openSnackbar('Paper Added', 'Ok');
          this.papermaster.reset();
          this.fetchData();
        } else {
          alert(result.msg);
          this.papermaster.reset();
        }
      });
    }
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.paper_list.filter = filterValue.trim().toLowerCase();
    if (this.paper_list.paginator) {
      this.paper_list.paginator.firstPage();
    }
}

applyFilter_c(event: Event) {

  const filterValue = (event.target as HTMLInputElement).value;
  this.companyinfo.filter = filterValue.trim().toLowerCase();
  if (this.companyinfo.paginator) {
    this.companyinfo.paginator.firstPage();
  }
}



  addCompany() {
    if (this.papermaster.get('addform').get('Company_name').value === '') {
      alert('Please Add Paper');
    } else {
      if (this.papermaster.get('addform').valid) {
        this.comp = {
          Comapany_id: null,
          Company_name: this.papermaster.get('addform').get('Company_name').value,
        };
        this.apiService.add_company_to_master(this.comp).subscribe((result:any) => {
        if (result['success'] === true) {
          this.openSnackbar('Company Added', 'Ok');
          this.papermaster.reset();
          this.fetchCompany();
        } else {
          alert('Already Entered');
          this.papermaster.reset();
        }
        });
      }
    }
  }


}
