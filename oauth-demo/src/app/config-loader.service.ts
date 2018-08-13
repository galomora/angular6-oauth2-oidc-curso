import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { KeycloakConfig } from './keycloak-config';

@Injectable({
  providedIn: 'root'
})
export class ConfigLoaderService {

  static CONFIG_FILE = 'assets/keycloak.json';

  constructor(private httpClient: HttpClient) { }

  getConfig (): Observable<any> {
    return this.httpClient.get (ConfigLoaderService.CONFIG_FILE).pipe(
      map (response => this.mapConfig (response))
    );
  }

  private mapConfig (response): KeycloakConfig {
    const config: KeycloakConfig = new KeycloakConfig();
    config.realm = response['realm'];
    config.resource = response['resource'];
    config.authServerUrl = response['auth-server-url'];
    config.sslRequired = response['ssl-required'];
    config.credentials = response['credentials'];
    return config;
  }
}
