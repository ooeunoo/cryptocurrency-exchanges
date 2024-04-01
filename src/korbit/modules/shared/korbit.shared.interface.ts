export interface IKorbitOAuthData {
  client_id: string;
  client_secret: string;
  grant_type: string;
  refresh_token?: string;
}

export interface IKorbitOAuth {
  token_type: string; // "Bearer";
  access_token: string; //"IuqEWTK09eCLThRCZZSALA0oXC8EI7s";
  expires_in: string; //3600;
  scope: string; //"VIEW,TRADE";
  refresh_token: string; //"vn5xoOf4Pzckgn4jQSL9Sb3KxWJvYtm";
}
