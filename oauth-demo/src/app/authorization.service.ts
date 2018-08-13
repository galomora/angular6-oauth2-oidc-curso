import { Injectable } from '@angular/core';
import { KeycloakConfig } from './keycloak-config';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  static AUTHORIZATION_URL = 'http://localhost:8080/auth/realms/master/protocol/openid-connect/token';

  constructor() { }

  obtainToken (accessToken: string, config: KeycloakConfig ): Promise<any> {
    let params = this.createAuthorizationParams(accessToken);
    let encodedCredentials = this.encodeCredentials (config);
    return new Promise(function (resolve, reject) {
      console.log ('a hacer post');
      let request = new XMLHttpRequest();
      request.open ('POST', AuthorizationService.AUTHORIZATION_URL, true);
      request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
      request.setRequestHeader ('Authorization', 'Basic ' + encodedCredentials);
      request.onload = resolve;
      request.onerror = reject;
      request.send(params);
    });
  }

  private createAuthorizationParams (accessToken: string) : string {
    const params = new URLSearchParams ();

    params.append ('grant_type', 'authorization_code');
    params.append ('code', accessToken);
    params.append ('redirect_uri', 'http://localhost:4200/menu');
    return params.toString();
  }

  private encodeCredentials (config: KeycloakConfig): string {
    const toEncode = config.resource + ':' + config.credentials.secret;
    return btoa (toEncode);
  }

  public obtainTokenObservable (accessToken: string, config: KeycloakConfig): Observable<any> {
    return from (this.obtainToken (accessToken, config));
  }
}
