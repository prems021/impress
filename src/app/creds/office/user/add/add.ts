

import { Component , OnInit} from '@angular/core';
import { FormBuilder,Validators, FormGroup , FormControl} from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add.html',
  styleUrls: ['./add.scss']
})
export class Add_user_Component implements OnInit {

  title : number = 0;
  push_disabled_save  : number = 1;
  isValidFormSubmitted = null;
  custform = new FormGroup({
   customerName: new FormControl('', [Validators.minLength(3), Validators.maxLength(255)]),
   address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)])	 ,
   email: new FormControl ('',Validators.email),
   mob1 : new FormControl('', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
   mob2 :  new FormControl('', [Validators.max(999999999999)]),
   gst_no : new FormControl(''),
  });


  constructor(private api: ApiService, private rs: Router ) {
  }
  ngOnInit() {
  }
  onFormSubmit() {
     this.isValidFormSubmitted = false;
     if (this.custform.invalid) {
        return;
     }
     this.isValidFormSubmitted = true;


     console.log('user',this.custform.value);

     this.custform.reset();
  }
  get customerName() {
     return this.custform.get('customerName');
  }

  get address() {
    return this.custform.get('address');
 }

 get mob1() {
  return this.custform.get('mob1');
}

get mob2() {
   return this.custform.get('mob2');
 }

get email() {
   return this.custform.get('email');
 }

 get gst_no() {
   return this.custform.get('gst_no');
 }
 save_customer() {
   this.push_disabled_save = 2;
     this.api.addCustomer(this.custform.value).subscribe((res: any) => {   console.log('rsss',res)
       if (res.success === true) {
         alert('Customer  registed');
         this.custform.reset();
         this.push_disabled_save = 3;
       }
       else
       {
         alert(res.msg);
       }
     })
   }



}

