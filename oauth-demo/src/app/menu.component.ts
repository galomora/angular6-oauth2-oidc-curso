import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from './authorization.service';
import { ConfigLoaderService } from './config-loader.service';
import * as jwt from 'jsonwebtoken';
import { UserInfoService } from './user-info.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  code: string;
  state: string;
  jsonIDToken = {name: 'Procesando'};
  jsonUserInfo = {name: 'Procesando'};
  accessToken: string;
  constructor(private route: ActivatedRoute,
  private authorizationService: AuthorizationService,
private configLoaderService: ConfigLoaderService,
private userInfoService: UserInfoService) { }

  ngOnInit() {
    this.state = this.route.snapshot.queryParams['state'];
    this.code = this.route.snapshot.queryParams['code'];
    console.log ('code ' + this.code);
    if (this.code === undefined) { return; }
    this.configLoaderService.getConfig().subscribe (
      config => {
        console.log ('config ' + config.realm);
        this.authorizationService.obtainTokenObservable(this.code, config)
        .subscribe (tokenResponse => {
          console.log ('token devuelto ' + tokenResponse.target.response);
          let responseJSON = JSON.parse(tokenResponse.target.response);
          this.showIDTokenInfo (responseJSON['id_token']);
          this.accessToken = responseJSON['access_token'];
          this.showUserEndpointInfo();
        });
      }
    );
  }

  private showIDTokenInfo (encryptedToken) {
    console.log('encriptado ' + encryptedToken);
    const decoded = jwt.decode (encryptedToken);
    this.jsonIDToken = decoded;
  }

  private showUserEndpointInfo () {
    this.userInfoService.getUserInfoObservable(this.accessToken)
    .subscribe (responseUserInfo => {
      let responseJSON = JSON.parse(responseUserInfo.target.response);
      this.jsonUserInfo = responseJSON;
      console.log(JSON.stringify(responseJSON));
    });
  }

}
