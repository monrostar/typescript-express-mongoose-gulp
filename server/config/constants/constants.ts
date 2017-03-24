class Constants {

  static DB_CONNECTION_STRING : string = "mongodb://localhost/leagueplay-test";
  static APP_SECRET : string           = "ANCDU*A2313SD18213gd18cH*SACJm3668*&T#$)jsADC_Nd9-1ijhAHIDHc)ADHc82AS&&#$&!cSF";
  static LOGGER : {
    console: 1,
    debug: 2,
    db: 3,
    file: 4
  };



}

Object.seal(Constants);
export = Constants;
