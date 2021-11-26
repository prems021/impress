import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr';


import { DataService } from '../../services/data.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent implements OnInit {
  userForm : FormGroup;
  submitted = false;
  returnUrl: string;
  constructor(
    private fb: FormBuilder,
    public ds: DataService,
    public api : ApiService,
    private rs: Router,
    private toastr: ToastrService,
    private ps:NgxPermissionsService
  ) {}

  ngOnInit(): void {

    addEventListener('offline',(e) => {
      this.toastr.error('Offline Check internet connection');
    })

    addEventListener('online',(e) => {
      this.toastr.success('Internet connection is Working');
    })




    // this.authService.logoutUser();
    // this.api.navtoken=false;
    this.userForm = this.fb.group({
      UserName: ['', [Validators.required]],
      Password: ['', Validators.required],
    });
  }


  onFormSubmit() {
    this.api.loginuser(this.userForm.value)
            .subscribe((jsonData: any) => {
              this._get_res_login(jsonData)
            }, (err: any) => console.error(err),
            );
         }

  _get_res_login(data: any) {

    console.log('res', data)
    if (data.success == false) {

      this.toastr.error(data.msg);
    }
    else if (data.success == true) {
       localStorage.setItem('user_role', data.Role);
       this.ps.loadPermissions([data.Role]);

      if(data.Role == 'Pressoffice')
      {
        this.rs.navigate(['Pressoffice/dash']);
      }
      if(data.Role == 'Pressadmin')
      {
        this.rs.navigate(['Pressadmin/dash']);
      }

      if(data.Role == 'Pressdtp')
      {
        this.rs.navigate(['Pressdtp/dash']);
      }

      if(data.Role == 'Pressplan')
      {
        this.rs.navigate(['Pressplan/dash']);
      }

      if(data.Role == 'Pressplate')
      {
        this.rs.navigate(['Pressplate/dash']);
      }
      if(data.Role == 'Presspaper')
      {
        this.rs.navigate(['Presspaper/dash']);
      }

      if(data.Role == 'Pressprint')
      {
        this.rs.navigate(['Pressprint/dash']);
        console.log('here')
      }

      if(data.Role == 'Presscut')
      {
        this.rs.navigate(['Presscut/dash']);
        console.log('here')
      }
      


      




       this.api.building = data.building;
       if(this.api.building == 1)
       {
        localStorage.setItem('building', 'Main');
       }
       else
       {
        localStorage.setItem('building', 'Annex');
       }

    }
  }



}
