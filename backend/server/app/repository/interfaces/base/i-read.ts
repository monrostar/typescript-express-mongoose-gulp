interface Read<T> {
  retrieve : (callback : (error : any, result : any) => void) => void;
  findById : (_id : string, callback : (error : any, result : T) => void) => void;
  find : (expression : Object, callback : (error : any, result : Array<T>) => void) => void;
  findOne : (expression : Object, callback : (error : any, result : T) => void) => void;
}

export = Read;
