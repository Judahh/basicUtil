declare global {
    interface Array<T> {
      type: any;
      getType(): string;
    }
    
    interface JQueryStatic {
      cache;
    }
    
    interface String {
      replaceAll(search:string, replacement:string): string;
    }
  }
  
  declare interface Array<T> {
    type: any;
    getType(): string;
  }
  
  declare interface JQueryStatic {
    cache;
  }
  
  declare interface String {
    replaceAll(search:string, replacement:string): string;
  }
  
  String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
  };
  
  Array.prototype.getType = function () {
    return this.type;
  }
  
  // interface Object {
  //     getClassName(): string;
  //     getConstructor(): any;
  // }
  
  // Object.prototype.getConstructor = function() {
  //   return this.constructor;
  // }
  
  // Object.prototype.getClassName = function() {
  //   return this.constructor.name;
  // }

  export { Array, String }