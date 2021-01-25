import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'naresh-angular-project';


  constructor(private connectionService: ConnectionService) {
    this.checkInternetConnectionAvailability();
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
}
