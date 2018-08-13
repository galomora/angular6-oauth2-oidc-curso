import { Component, OnInit } from '@angular/core';
import { ConfigLoaderService } from './config-loader.service';

import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'oauth-demo Galo';
  loginURL: string;

  constructor (private configLoaderService: ConfigLoaderService,
    private  loginService: LoginService) {

  }

  ngOnInit(): void {
    this.generateLoginLink ();
  }

  private generateLoginLink () {
    this.configLoaderService.getConfig().subscribe(
      config => {
        this.loginURL = this.loginService.generateLoginURL(config);
      }
    );
  }
}
