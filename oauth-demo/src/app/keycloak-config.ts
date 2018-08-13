export class KeycloakConfig {
  realm: string;
  authServerUrl: string;
  sslRequired: string;
  resource: string;
  credentials: {
    secret : string;
  };

  constructor () {
    this.credentials = {secret: ''};
  }
}