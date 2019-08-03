import * as $ from 'jquery';
import 'simpleutils';

export class Util {
  public static browserLanguage;
  public static currentLanguage;
  public static dataJSON;

  public static elementHTML(name: string, id?: string, body?: string) {
    console.log('Name: ' + name);
    let hTML = '<' + name;
    if (id) {
      hTML += ' id="' + id;
    }
    if (body) {
      hTML += '">' + body + '</' + name;
    }
    return hTML + '>';
  }

  public static normalizePort(val: number | string): number | string | boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
  }

  public static getJsonPromise(path: string): JQueryPromise<any> {
    if (Util.dataJSON == null) {
      Util.dataJSON = new Array<any>();
    }
    if (Util.dataJSON[path] == null) {
      Util.dataJSON[path] = $.getJSON(path);
    }
    // else{
    //   console.log("CACHE");
    // }
    return Util.dataJSON[path];
    // return $.getJSON(path);
  }

  public static getTag(name: string) {
    let names: string[] = name.split('Component');
    return names[names.length - 1].toLowerCase();
  }

  public static getFileName(name: string) {
    return name.charAt(0).toLowerCase() + name.slice(1);
  }

  public static getCurrentComponentPath() {
    let error = new Error();
    // console.log("test:"+(stack+"")+"end");
    let stack = error.stack + 'END';
    // console.log("path:"+stack);
    let link = stack.split('(')[3];
    if (link == null || link === undefined || link === '') {
      link = stack.split('@')[3];
    }
    link = link.split('.js')[0].split(location.href)[1];
    // console.log("path:"+link);
    return link;
  }

  public static removeElements(elements: NodeListOf<Element>) {
    while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
  }

  public static getBrowserLanguage() {
    if (Util.browserLanguage !== undefined) {
      return Util.browserLanguage;
    }

    let navigator = <any>window.navigator,
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

    Util.browserLanguage = 'en-US';
    return Util.browserLanguage;
  }

  public static getCurrentLanguage() {
    if (Util.currentLanguage !== undefined) {
      return Util.currentLanguage;
    } else {
      Util.currentLanguage = Util.getBrowserLanguage();
    }
    return Util.currentLanguage;
  }

  public static camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  public static isEquivalentArray(a, b, ignore?) {
    if (a.length !== b.length) {
      return false;
    }

    for (let index = 0; index < a.length; index++) {
      let elementA = a[index];
      let elementB = b[index];
      if (elementA instanceof Array) {
        if (!this.isEquivalentArray(elementA, elementB, ignore)) {
          return false;
        }
      } else if (elementA instanceof Object) {
        if (!this.isEquivalentObject(elementA, elementB, ignore)) {
          return false;
        }
      } else {
        if (elementA !== elementB) {
          return false;
        }
      }
    }
    return true;
  }

  public static isEquivalentObject(a, b, ignore?) {
    // Create arrays of property names
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      let propName = aProps[i];
      let jump = false;

      if (ignore) {
        if (propName === ignore) {
          jump = true;
        }
      }

      if (!jump) {
        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] instanceof Array) {
          if (!this.isEquivalentArray(a, b, ignore)) {
            return false;
          }
        } else if (a[propName] instanceof Object) {
          if (!this.isEquivalentObject(a, b, ignore)) {
            return false;
          }
        } else {
          if (a[propName] !== b[propName]) {
            return false;
          }
        }
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }
}
