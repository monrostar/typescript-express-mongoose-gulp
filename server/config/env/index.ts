import * as nconf from "nconf";
import * as path from "path";
import * as winston from "winston";

const configs = new nconf.Provider({
  env: true,
  argv: true,
  store: {
    type: "file",
    file: path.join(__dirname, `./config.${process.env.NODE_ENV || "development"}.json`)
  }
});

winston.log("info", `Server use ${process.env.NODE_ENV} configurations`);


// interfaces
export interface IServerConfigurations {
  cpuCores: any;
  port : number;
  schema : string;
  url : string;
  plugins : Array<string>;
  jwtSecret : string;
  jwtExpiration : string;
  credit: Array<number>;
}

export interface IDataSession {
  secret : string;
  key : string;
  cookie : Array<any>;
}

export interface IDataConfiguration {
  mongodb : {connectionString};
  pg      : {user, database, password, host, port, max, idleTimeoutMillis};
}

export interface IDataMemcached {
  hosts : Array<string>;
  prefix : string;
}

export interface IDataAuth {
  fb : Object;
  vk : Object;
}
//end interfaces

// methods
export function getDatabaseConfig() : IDataConfiguration {
  return configs.get("database");
}

export function getSessionConfigs() : IDataSession {
  return configs.get("session");
}

export function getServerConfigs() : IServerConfigurations {
  return configs.get("app");
}

export function getMemcachedConfigs() : IDataMemcached {
  return configs.get("memcached");
}

export function getAuthConfigs() : IDataMemcached {
  return configs.get("auth");
}

