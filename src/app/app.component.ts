import { Component, EventEmitter, Input, OnInit, Output, ViewChild  } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { SidebarComponent, SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'naresh-angular-project';
  _opened: boolean = false;
  @ViewChild('sidebar') sidebar: SidebarComponent;
  public onCreated(args: any) {
     this.sidebar.element.style.visibility = '';
  }
  angularLogo: any;
  angularWording: any;
  angularMaterialLogo: any;

  constructor(private connectionService: ConnectionService, private router: Router) {
    this.checkInternetConnectionAvailability();
  }

  ngOnInit() {
    //this.callAngularBackground();
    this.angularLogo = "/assets/Angular_background.png";
    this.angularWording = "/assets/Angular_wording.png";
    this.angularMaterialLogo = "/assets/Angular_Material_logo.png"
  }

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  checkInternetConnectionAvailability() {
    let status = 'ONLINE';
    let isConnected = true;
    this.connectionService.monitor().subscribe(successConnection => {
      isConnected = successConnection;
      if (isConnected) {
        window.alert('You are back Online');
      } else {
        window.alert('You are offline, Please check your Internet connection!!');
      }
    })
  }

  onNavigateToAngularDocument() {
    console.log('navigate');
    const url = "https://angular.io/";
    window.open(url, '_blank');
  }

  onNavigateToAngularMaterialDocument() {
    console.log('navigate');
    const url = "https://material.angular.io/";
    window.open(url, '_blank');
  }

}
