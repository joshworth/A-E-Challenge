import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'factorial-game';

  constructor(public authService: AuthService, ) {
    console.log("AppComponent... contructor");

  }

  ngOnInit () {
    console.log("AppComponent... ngOnInit");
  }
}
