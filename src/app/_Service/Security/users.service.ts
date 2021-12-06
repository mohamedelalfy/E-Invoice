import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { GlobalApiurlService } from '../global-apiurl.service';
import { Iuser } from 'src/app/_Interface/Security/iuser';
import { IuserLogon } from 'src/app/_Interface/Security/iuser-logon';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  [x: string]: any;
  public  Seruser: Iuser;
  public loguser: IuserLogon;

  constructor(private http: HttpClient, private GlobalAPI: GlobalApiurlService) { }

  
  localUrl = this.GlobalAPI.URLAPI + "Auth/";
  Login(name:any , password:any)
  {
    return this.http.get<Iuser>(this.localUrl + 'login' + '/' + name + '/' + password);
  }
  postdata()
  {
    return this.http.post(this.localUrl + 'register', this.Seruser);
  }

  postdatasecure()
  {
    return this.http.post(this.localUrl + 'loginuserSecure', this.loguser ,{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })});
 
  }
  putdata()
  {
    return this.http.put(this.localUrl + 'put', this.Seruser);
  }

  GetOne(id:any,val:any)
  {
    return this.http.get<Iuser>(this.localUrl + 'getOne/'+id+'/'+val);
  }

  GetLogin(id:any)
  {
    return this.http.get<Iuser>(this.localUrl + 'GetLogin/'+id);
  }

  GetAlldata()
  {
    return this.http.get(this.localUrl + 'get');
  }

  GetAllAvailable()
  {
    return this.http.get(this.localUrl + 'getAvailable');
  }
  GetAvialableUsersnew(index:any)
  {
    
    return this.http.get(this.localUrl + 'GetAvialableUsersnew/'+index);
  }
  Delete(index:any)
  {
    return this.http.delete(this.localUrl + 'Delete/' + index );
  }

  ResetPassword(username:any)
  {
    return this.http.get(this.localUrl + 'Reset/' + username);
  }
}
