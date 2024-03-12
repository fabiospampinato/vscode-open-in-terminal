
/* IMPORt */

import {getConfig} from 'vscode-extras';
import type {Options} from './types';

/* MAIN */

const getOptions = (): Options => {

  const config = getConfig ( 'openInTerminal' );
  const app = isString ( config?.app ) ? config.app : 'Terminal';

  return { app };

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

/* EXPORT */

export {getOptions, isString};
