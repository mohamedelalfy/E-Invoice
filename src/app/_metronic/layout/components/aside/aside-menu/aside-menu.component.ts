import { Component, OnInit } from '@angular/core';
import { IProgram } from 'src/app/_Interface/Security/iprogram';
import { ProgSericeService } from 'src/app/_Service/Security/prog-serice.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  islogin = false;
  isActive: boolean;
  collapsed: boolean;
  showMenu: string;
  pushRightClass: string;
  username:any | null;
  progmenu: IProgram[] = [];
  // getItem(key: string): string | null
  constructor(
    private progservice: ProgSericeService
    ) {
      if ( localStorage.getItem('username') != null && localStorage.getItem?('username').toString() !== '':'')
      {
        this. username=localStorage.getItem('username')?.toString().substring(0,10);
        this. islogin = true;
        this.getallmenudata();
      }
      else { this.islogin = false;
  
      }
    }
  getallmenudata()
  {
    this.progservice.getmenu(localStorage.getItem('username'))
    .subscribe(data => {
        this.progmenu = data;
        });
      }
    Logout(){
    localStorage.setItem('username', '');
    localStorage.setItem('GroupID', '0');
    localStorage.setItem('userid', '');
    localStorage.removeItem('jwt');
    window.location.replace('');
    }

  ngOnInit(): void { }
    
  getchidList(progid:any){
    return this.progmenu.filter(x => x.parentID == progid);
  }
  getParentList()
  {
    return this.progmenu.filter(x => x.parentID == 0);
  }
}
