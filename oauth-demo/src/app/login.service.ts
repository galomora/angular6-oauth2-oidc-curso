import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { KeycloakConfig } from './keycloak-config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static LOGIN_URL = 'http://localhost:8080/auth/realms/master/protocol/openid-connect/auth';

  constructor() { }

  generateLoginURL (config: KeycloakConfig): string {
    return LoginService.LOGIN_URL + '?' + this.createAuthenticationParams (config);
  }

  private createAuthenticationParams (config: KeycloakConfig) : string {
    const params = new URLSearchParams ();
    params.append ('response_type', 'code');
    params.append ('scope', 'openid');
    console.log('resource ' + config.resource);
    params.append ('client_id', config.resource);
    params.append ('state', 'myState');
    params.append ('redirect_uri', 'http://localhost:4200/menu');
    return params.toString();
  }
}
