import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalApiurlService {
  private httpClient: HttpClient;

  constructor(public http: HttpClient) {
    this.httpClient = http;
 
  } 
  public httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic ' + btoa('besttop.systems@besttopsystems.com:Bts11111')
    })
  };
  public URLAPI = 'https://www.besttopsystems.net:9099/api/';

  public httpOptions = {
    headers: new HttpHeaders(
        {
          Authorization: `Bearer ` + localStorage.getItem('jwt'),
        }
    )
};

}
