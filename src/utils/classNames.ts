function toVal(mix: ClassValue) {
    let k;
    let y;
    let str = '';
  
    if (typeof mix === 'string' || typeof mix === 'number') {
      str += mix;
    } else if (typeof mix === 'object') {
      if (Array.isArray(mix)) {
        const len = mix.length;
        for (k = 0; k < len; k++) {
          if (mix[k]) {
            if ((y = toVal(mix[k]))) {
              str && (str += ' ');
              str += y;
            }
          }
        }
      } else {
        for (k in mix) {
          if (mix?.[k]) {
            str && (str += ' ');
            str += k;
          }
        }
      }
    }
  
    return str;
  }
  
  export type ClassValue =
    | ClassValue[]
    | ClassDictionary
    | string
    | number
    | null
    | boolean
    | undefined;
  
  export type ClassDictionary = Record<string, unknown>;
  
  // Based on https://github.com/lukeed/clsx with slight modifications for latest TS
  export function classNames(...classes: ClassValue[]) {
    let i = 0;
    let tmp;
    let x;
    let str = '';
    const len = classes.length;
  
    for (; i < len; i++) {
      if ((tmp = classes[i])) {
        if ((x = toVal(tmp))) {
          str && (str += ' ');
          str += x;
        }
      }
    }
    return str;
  }
  