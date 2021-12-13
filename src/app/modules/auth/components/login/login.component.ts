import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/_Service/Security/users.service';
import { IApi } from 'src/app/_Interface/Views/iapi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  InvalidLogin: boolean;
  isSubmitted: any;
  obapi:IApi;
  // KeenThemes mock, change it to:
  defaultAuth: any 
  // = {
  //   email: 'admin@demo.com',
  //   password: 'demo'
  // };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public AdminServ: UsersService

  ) {
 
    if ( localStorage.getItem('username')!=null&&localStorage.getItem('username')?.toString()!="") {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.reset();


  }

  reset() {
    this.AdminServ.Seruser = {
     address: '',
     groupId: 0,
     id: 0,
     mobile1: '',
     mobile: '',
     name: '',
     nameLat: '',
     password: '',
     userName: '',


    };
    this.AdminServ.loguser={
      userName:'',
      password:'',
    };
  }



  submit() {
    if (this.AdminServ.Seruser.password !== '' &&
    this.AdminServ.Seruser.userName !== '') {
     this. AdminServ.loguser.userName = this.AdminServ.Seruser.userName ;
     this. AdminServ.loguser.password = this.AdminServ.Seruser.password ;
     this.AdminServ.postdatasecure().subscribe(res => {
      const token = (<any>res).token;
      console.log(token);
      localStorage.setItem('jwt', token);
      if (res != null) {
        this.AdminServ.GetLogin(this.AdminServ.Seruser.userName).subscribe(res2 =>
          {
            this.InvalidLogin = false;
            localStorage.setItem('username', res2.userName);
            localStorage.setItem('GroupID', res2.groupId.toString());
            localStorage.setItem('userid', res2.id.toString());
            localStorage.setItem('textDir','ltr');
            // console.log(res);

            this.router.navigate(['/']);
          }
        );

        }
        else {
          alert('Invalid password or username');
          this.InvalidLogin = true;
          localStorage.setItem('username', '');
          localStorage.setItem('GroupID', '0');
          localStorage.setItem('userid', '');
          localStorage.removeItem('jwt');
        }
      });
    }
    else {
    alert('Please enter password and username');
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
