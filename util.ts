import * as $ from 'jquery';
import 'simpleutils';

export class Util {
  private static instance: Util;
  private browserLanguage;
  private currentLanguage;
  // public static dataJSON;

  public static getInstance(): Util {
    if (!this.instance) {
      this.instance = new Util();
    }
    return this.instance;
  }

  public elementHTML(name: string, id?: string, body?: string) {
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

  public normalizePort(val: number | string): number | string | boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
  }

  public getJsonPromise(path: string): JQueryPromise<any> {
    // if (this.dataJSON == null) {
    //   this.dataJSON = new Array();
    // }
    // if (this.dataJSON[path] == null) {
    //   this.dataJSON[path] = $.getJSON(path);
    // }

    // return this.dataJSON[path];
    return $.getJSON(path);
  }

  public getTag(name: string) {
    let names: string[] = name.split('Component');
    return names[names.length - 1].toLowerCase();
  }

  public getFileName(name: string) {
    return name.charAt(0).toLowerCase() + name.slice(1);
  }

  public getCurrentComponentPath() {
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

  public removeElements(elements: NodeListOf<Element>|HTMLCollectionOf<Element>|HTMLCollectionOf<HTMLElement>) {
    while (elements[0]) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  public getBrowserLanguage() {
    if (this.browserLanguage !== undefined) {
      return this.browserLanguage;
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
          this.browserLanguage = language;
          return language;
        }
      }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = navigator[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        this.browserLanguage = language;
        return language;
      }
    }

    this.browserLanguage = 'en-US';
    return this.browserLanguage;
  }

  public getCurrentLanguage() {
    if (this.currentLanguage !== undefined) {
      return this.currentLanguage;
    } else {
      this.currentLanguage = this.getBrowserLanguage();
    }
    return this.currentLanguage;
  }

  public setLanguage(language: string) {
    // this.dataJSON = new Array();
    this.currentLanguage = language;
    this.setCookie('language', language);
  }

  public publicApiRequest(methodType: string, apiURL: string, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        // console.log(xmlHttp.responseText);
        callback(xmlHttp.responseText);
      }
    }
    xmlHttp.open(methodType, apiURL, true); // true for asynchronous
    xmlHttp.send(null);
  }

  public setCookie(name: string, value: any, expiresDays?: number) {
    if (expiresDays) {
      let d = new Date();
      d.setTime(d.getTime() + (expiresDays * 24 * 60 * 60 * 1000));
      let expires = 'expires=' + d.toUTCString();
      document.cookie = name + '=' + value + ';' + expires + ';path=/';
    } else {
      document.cookie = name + '=' + value + ';path=/';
    }
  }

  public clearCookie(name: string, expiresDays?: number) {
    if (expiresDays) {
      let d = new Date();
      d.setTime(d.getTime() + (expiresDays * 24 * 60 * 60 * 1000));
      let expires = 'expires=' + d.toUTCString();
      document.cookie = name + '=' + '' + ';' + expires + ';path=/';
    } else {
      document.cookie = name + '=' + '' + ';path=/';
    }
  }

  public getCookie(name: string) {
    name += '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  public checkCookie() {
    let user = this.getCookie('username');
    if (user !== '') {
      alert('Welcome again ' + user);
    } else {
      user = prompt('Please enter your name:', '');
      if (user !== '' && user != null) {
        this.setCookie('username', user, 365);
      }
    }
  }

  // NodeListOf HTMLCollectionOfToNodeListOf(collection: HTMLCollectionOf<HTMLElement>) {
  //   let nodeListOf = [];

  //   if (collection) {
  //     for (let i = 0; i < collection.length; i++) {
  //       let node: Node = collection[i];

  //       // Make sure it's really an Element
  //       if (node.nodeType == Node.ELEMENT_NODE) {
  //         nodeListOf.push(node as HTMLElement);
  //       }
  //     }
  //   }

  //   return (<NodeListOf<Element>> nodeListOf);
  // }

  public camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  public isEquivalentArray(a, b, ignore?) {
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

  public isEquivalentObject(a, b, ignore?) {
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
