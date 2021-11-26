

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray,ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { Add_user_Component } from '../../office/user/add/add';
//import { Work } from '../../../service/Model';

export interface PaperTy {
  id: number;
  Papertype: string;
  Gsm: number;
  Size: string;
}

export interface GST {
  Gst_type: string;
  Gst_value: number;
  id : number;
}

export interface PaperQy {
  Gsm: number;
}

export interface EngineerNa {
  engineerName: string;
}

export interface customer {
  customerName : string,
  address : string,
  email : string,
  mob1 : string,
  id : number
}





@Component({
  selector: 'app-new-customer-order',
  templateUrl: './new-work.html',
  styleUrls: ['./new-work.scss']
})
export class newOrder_Component implements OnInit {
  company_name: string = 'St. Joseph'

  tomorrow = new Date();
  yesterday = new Date();
  customer_source: customer[] = [];
  engineer_list: any[] = [];
  workorderno:number;
  gstIn: any[] = [];
  matts: string[] = ['Matt', 'Glossy', 'Knurling','Uv Coating','Foiling','Empossing','None'];
  showBind = false;
  showBind_matt = false;
  btnColor = '#a2a2b9';
  btnColor_matt = '#a2a2b9';
  favoriteSeason: string;
  show = false;
  show_paper_option = false;
  buttonName = 'Show';
  fetchpaper: PaperTy[];
  labelss : any[];
  dataarray: any[];
  other_paper_arrray : any[];
  resultarray: any[];

  isLinear: boolean = false;
  Tax_incl: boolean = false;
  gst_percentage: number = 0
  total_amt: number = 0;
  unit_amt: number = 0;
  discount_amt: number = 0;
  travel_amt: number = 0;
  cess_percentage: number = 0;
  submitt_work : boolean = false;
  d1: number = 0;
  d2: number = 0;
  d3: number = 0;
  d4: number = 0;
  d5: number = 0;
  d6: number = 0;

  public Labels = ['Engineer', 'Supervisor', 'Mesthri','Helper'];
  workform1: FormGroup;
  workform2: FormGroup;
  workform3: FormGroup;
  workform4: FormGroup;
  workform5: FormGroup;
  workform6: FormGroup;
  workform7: FormGroup;


  Work_dets = new FormGroup({
    DATE: new FormControl(''),

    labour_dets: new FormArray([
      new FormGroup({
        LABOUR_CATEGORY: new FormControl(''),

        REMARKS : new FormControl(''),
      })
    ]),

    site_expenses: new FormArray([
      new FormGroup({

        REMARKS : new FormControl(''),
      }),
    ]),


  });


  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router, private apiService: ApiService,
    public dialog: MatDialog, private datepipe: DatePipe, private currency: CurrencyPipe) {
    this.tomorrow.setDate(this.tomorrow.getDate());
    this.yesterday.setDate(this.yesterday.getDate());
  }

  ngOnInit() {

    this.submitt_work = false;

    this.workform1 = this.formBuilder.group({
      Work_no : 0,
      orderDate: [new Date(), [Validators.required]],
      estimateDate: [new Date(),''],


    });

    this.workform2 = this.formBuilder.group({


      customerName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: [{ value: '', disabled: true }],
      mob1: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      mob2: [{ value: '', disabled: true }],
      cid: 0,


    });




    this.workform3 = this.formBuilder.group({
      workName: ['', [Validators.required, Validators.minLength(3)]],
      workSize: [''],
      workSize_select : ['', Validators.required],
      copies: [0, [Validators.required]],
      typePrinting: ['', [Validators.required]],
      engineer: ['',[Validators.required]],
      mColor: null,
      sColor: null,
      twoColor: null,
      bandWhite: null,
      cover: null,
    });



    this.workform4 = this.formBuilder.group({

      other_binding: [''],
      folding: false,
      stitching: false,
      perfect: false,
      centerPin: false,
      padmaking: false,
      shringwrap: false,
      creasing: false,
      numbering: false,
      spiral_binding : false,
      case_binding : false,
      hard_binding : false,
      tin_mounting: false,
      shring_wrap_bundle_each : false,
      hole_punch: false,
      flush_cutting : false,
      none_binding : false,
      matt: ['Glossy', Validators.required],
      other_lamination: [''],
      other_lamination_flag : false,
      other_binding_flag : false



    });




    this.workform5 = this.formBuilder.group({


      other_paper: [''],
      other_paper_ary: this.formBuilder.array([]),
      paper: this.formBuilder.array([], isNameDup()),

    });





    this.workform6 = this.formBuilder.group({

      unitAmount: [''],
      tax: [''],
      discount: 0,
      travel_amt: 0,
      grand_amt: [''],
      cess: [''],
      taxAmount: [''],
      totalAmount: [''],
      Gst_id : 0 ,
      Gst_type:this.formBuilder.group({
        id:0,
        Gst_type: [''],
        Gst_value: 0
      })

    });

    this.workform7 = this.formBuilder.group({


      outsource: false,


    });









    this.load_all_customers();
    this.load_all_engineers();
    this.getGst();
    this.getpaperType();
    // this.getCess()

  }





  addfb()
  {
   const aar =   this.get_skills();
   aar.push(this.add_new_skill());
  }
  get_skills() {
    return this.Work_dets.get('labour_dets') as FormArray;
  }
  private add_new_skill(): FormGroup {
    return new FormGroup({
      LABOUR_CATEGORY: new FormControl(''),
      REMARKS: new FormControl('')
    })
  }

  remove_labour_dets(i: number) {
    const labour_dets_ = this.Work_dets.get('labour_dets') as FormArray
    if (labour_dets_.length > 1) {
      labour_dets_.removeAt(i)
    } else {
      labour_dets_.reset()
    }
  }






  // getCess() {
  //   this.apiService.cessData().subscribe((result: any) => {
  //     console.log('cess _r',result);
  //     this.cess_percentage = result[0].cess_percent;
  //     console.log('cess_p', this.cess_percentage);

  //   })
  // }


  cmpare(index:any) {
    return index;
  }

  change_tax_gst(e:any) {
      console.log('ev',e.value);
      this.gst_percentage = e.value.Gst_value;
      console.log('ev id ',e.value.id);
      this.workform6.patchValue({Gst_id : e.value.id})
      console.log('patch id ',this.workform6.value);
      this.calcuateGst_new();
  }

  calcuateGst_new() {

     if (this.workform6.controls.tax.value === 'in') {


      this.total_amt = this.workform6.controls.totalAmount.value;
      this.discount_amt = this.workform6.controls.discount.value;
      this.travel_amt = this.workform6.controls.travel_amt.value;



      this.d1 = ((this.total_amt - this.discount_amt) * 100);
      this.d2 = ((this.gst_percentage - 0) + 100);
      this.d3 = this.d1 / this.d2;
      this.d3 = Math.round(this.d3 * 100) / 100
      this.workform6.patchValue({ unitAmount: this.d3 });


      this.d4 = (this.total_amt - this.discount_amt) - this.d3;
      this.d4 = Math.round(this.d4 * 100) / 100;
      this.workform6.patchValue({ taxAmount: this.d4 });

      // if (this.gst_percentage > 5) {
      //   this.d5 = (this.d3 * this.cess_percentage) / 100;
      //   this.d5 = Math.round(this.d5 * 100) / 100;
      //   this.workform6.patchValue({ cess: this.d5 });
      // }
      this.d5 = 0;
      this.workform6.patchValue({ cess: 0 })

      this.d6 = this.d3 + this.d4 + this.d5 + this.travel_amt;
      this.workform6.patchValue({ grand_amt: this.d6 });





    }

    else if (this.workform6.controls.tax.value === 'ex') {



      this.unit_amt = this.workform6.controls.unitAmount.value;
      this.discount_amt = this.workform6.controls.discount.value;
      this.travel_amt = this.workform6.controls.travel_amt.value;


      // if (this.gst_percentage > 5) {
      //   this.d1 = (this.unit_amt * this.cess_percentage) / 100;
      //   this.d1 = Math.round(this.d1 * 100) / 100;
      //   this.workform6.patchValue({ cess: this.d1 });
      // }
      this.workform6.patchValue({ cess: 0 });
      this.d1 = 0;

      this.d2 = (this.unit_amt * this.gst_percentage) / 100;
      this.d2 = Math.round(this.d2 * 100) / 100;
      this.workform6.patchValue({ taxAmount: this.d2 });
      this.d3 = (this.unit_amt - 0) + this.d1 + this.d2;
      this.d3 = Math.round(this.d3 * 100) / 100;
      this.workform6.patchValue({ totalAmount: this.d3 });
      this.d4 = this.d3 - this.discount_amt + this.travel_amt;
      this.workform6.patchValue({ grand_amt: this.d4 });


    }


  }



  load_all_customers() {
    this.apiService.fetchCustomer().subscribe((customerData: any) => {
      this.customer_source = customerData, console.log('cus list', this.customer_source)
    }, (err: any) => console.error(err),

    );

  }

  load_all_engineers() {

    this.apiService.get_all_Engineers().subscribe((engineerData: any) => {
      console.log('data', engineerData)
      this.engineer_list = engineerData.data, console.log('data', this.engineer_list)
    }, (err: any) => console.error(err),);

  }

  changee(e: any) {
    console.log('e', e);
  }


  Tax_radio_Change(ev: any) {
    console.log('ev', ev)
    if (ev.value == 'in') {
      this.Tax_incl = true;
    }

  }




  change_name(key: any) {


  }



  openDialog() {
        const dialogRef = this.dialog.open(Add_user_Component);
        dialogRef.afterClosed().subscribe(result => {
          this.load_all_customers();
        console.log(`Dialog result: ${result}`);
    });
  }

  my_search_Callback(ev: customer) {
    console.log('e', ev)
    this.workform2.patchValue({ customerName: ev.customerName, address: ev.address, email: ev.email, mob1: ev.mob1, cid: ev.id })
    console.log('form', this.workform2)

  }


  getGst() {
    this.apiService.fetchGst().subscribe(info => {
      this.gstIn = info['data'];
    });
  }

  toggleBind() {
    this.showBind = !this.showBind;
    //this.

  }

  toggleBind_matt() {
    this.showBind_matt = !this.showBind_matt;

  }



  change_tax(ev: any) {
    console.log('data', ev);
    if (ev.value === 'in') {
      this.workform6.controls.cess.disable();
      this.workform6.controls.unitAmount.disable();
      this.workform6.controls.taxAmount.disable();
      this.workform6.controls.grand_amt.disable();
      this.workform6.controls.totalAmount.enable();
    }
    else if (ev.value === 'ex') {
      this.workform6.controls.taxAmount.disable();
      this.workform6.controls.grand_amt.disable();
      this.workform6.controls.cess.disable();
      this.workform6.controls.totalAmount.disable();
      this.workform6.controls.unitAmount.enable();

    }
  }



  onChange_outsource() {
    console.log('work_other',this.workform7.controls.outsource.value);
     }

  toggle() {
    this.show = !this.show;
    if (this.show) {
      this.buttonName = 'Hide';
    } else {
      this.buttonName = 'Show';
    }
  }

  change() {
    if (this.btnColor === 'green') {
      this.btnColor = 'red';
    } else {
      this.btnColor = 'green';
    }
  }



  setlangfun() {
    this.paperarray.push(this.addpaper());
  }

  removelangfun(index: any) {
    this.paperarray.removeAt(index);
  }

  get paperarray() {
    return <FormArray>this.workform5.get('paper');
  }

  get other_paperarray() {
    return <FormArray>this.workform5.get('other_paper_ary');
  }


  addpaper(): FormGroup {
    return this.formBuilder.group({
      paper: ['']
    });
  }

  add_other_paper(): FormGroup {
    return this.formBuilder.group({
      oth_paper: ['']
    });
  }

  add_other_paper_fun() {
    this.other_paperarray.push(this.add_other_paper());
  }

  remove_other_paper_fun(index: any) {
    this.other_paperarray.removeAt(index);
  }

  get pape_r() {

    return this.workform5.get('paper');
  }


  getpaperType() {
    this.apiService.getpaperType().subscribe((result: PaperTy[]) => {


      this.fetchpaper = result['data'];
      this.labelss = result['data'];
      console.log('paper log..#', this.labelss)
      this.show_paper_option = true;

    });
  }

  Reset_work_form() {
    console.log('clicked');
  }

  generatePdf() {

  }

  addWork() {
    this.submitt_work = true;
    console.log('hi');


    //  console.log(this.workform.get('other').value);
    this.showBind_matt
    this.workform4.patchValue({other_lamination_flag : this.showBind_matt , other_binding_flag : this.showBind})
    this.dataarray = this.workform5.get('paper').value;
    this.other_paper_arrray = this.workform5.get('other_paper_ary').value;
    //this.newWork = this.workform.value,




      this.resultarray = [
        this.workform1.value,
        this.workform2.getRawValue(),
        this.workform3.value,
        this.workform4.value,
        this.workform5.value,
        this.workform6.getRawValue(),
        this.workform7.value,
        this.dataarray,
        this.other_paper_arrray
      ];


    console.log('rarra', this.resultarray);
    this.apiService.addnewWork(this.resultarray).subscribe((jsonData) => { this._res_work(jsonData)
    },(err) => console.error(err),

    );
   }

  _res_work(res:any)
  {
    console.log('res', res);
    if (res.success == true) {
      console.log('t');
       this.workform1.controls.Work_no.setValue(res.result)
       this.workorderno=res.wid+1;
       alert('Work added with Order No'+ this.workorderno);
       setTimeout (() => {
           window.print();

           this.router.navigate(['/Pressoffice/view-order']);
     }, 1000);

    }
    else {
      console.log('failed',res);
      alert('Work not added, Some database error occured');
    }
  }


}


function isNameDup() {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value);
      const names = totalSelected.map(value=> value.paper)
       const hasDuplicate = names.some(
    (paper, index) => names.indexOf(paper, index + 1) != -1
  );
     return  hasDuplicate ? { duplicate: true } : null;
  }
  return validator;
}
