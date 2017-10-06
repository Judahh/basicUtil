import * as $ from "jquery";
import "simpleutils";

export class Util {
  static browserLanguage;
  static currentLanguage;
  static dataJSON;

  static elementHTML(name: string, id?: string, body?: string) {
    console.log("Name: " + name);
    var hTML = "<" + name;
    if (id) {
      hTML += " id=\"" + id;
    }
    if (body) {
      hTML += "\">" + body + "</" + name;
    }
    return hTML + ">";
  }

  static normalizePort(val: number|string): number|string|boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
  }

  static getJsonPromise(path: string): JQueryPromise<any> {
    if (Util.dataJSON == null){
        Util.dataJSON = new Array<any>();
    }
    if (Util.dataJSON[path] == null){
        Util.dataJSON[path] = $.getJSON(path);
    }
    // else{
    //   console.log("CACHE");
    // }
    return Util.dataJSON[path];
    // return $.getJSON(path);
  }

  static getTag(name: string) {
    var names: string[] = name.split("Component");
    return names[names.length - 1].toLowerCase();
  }

  static getFileName(name: string) {
    return name.charAt(0).toLowerCase() + name.slice(1);
  }

  static getCurrentComponentPath() {
    var error = new Error();
    // console.log("test:"+(stack+"")+"end");
    var stack = error.stack+"END";
    // console.log("path:"+stack);    
    var link = stack.split('(')[3];
    if(link==null||link==undefined||link==""){
      link = stack.split('@')[3];
    }
    link = link.split('.js')[0].split(location.href)[1];
    // console.log("path:"+link);
    return link;
  }

  static removeElements(elements: NodeListOf<Element>) {
    while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
  }

  static getBrowserLanguage() {
    if (Util.browserLanguage != undefined) {
      return Util.browserLanguage;
    }

    var navigator = <any>window.navigator,
      browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
      i,
      language;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(navigator.languages)) {
      for (i = 0; i < navigator.languages.length; i++) {
        language = navigator.languages[i];
        if (language && language.length) {
          Util.browserLanguage = language;
          return language;
        }
      }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = navigator[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        Util.browserLanguage = language;
        return language;
      }
    }

    Util.browserLanguage = "en-US";
    return Util.browserLanguage;
  }

  static getCurrentLanguage() {
    if (Util.currentLanguage != undefined) {
      return Util.currentLanguage;
    } else {
      Util.currentLanguage = Util.getBrowserLanguage();
    }
    return Util.currentLanguage;
  }

}