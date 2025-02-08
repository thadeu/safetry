import type acorn from 'acorn';
import type TryStatement = require('acorn');

declare global {
  interface SafetryBlock extends Node {
    type: TryStatement;
    body: any[]
    content?: () => any;
  }
  
  var safetry: SafetryBlock & any & {}

  namespace NodeJS {
    interface Global {
      safetry: any;
    }
  }

  export type SafetryResult<T> = [Error | null, T];
  export type AsyncSafetryResult<T> = Promise<SafetryResult<T>>;
}
      
export {};
