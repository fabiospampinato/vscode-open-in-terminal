
/* IMPORT */

import vscode from 'vscode';
import {alert, getActiveFolderPath, getProjectRootPath, openInApp} from 'vscode-extras';
import {getOptions} from './utils';

/* MAIN */

const openWith = async ( integrated: boolean, root: boolean ): Promise<void> => {

  const cwd = root ? getProjectRootPath () : getActiveFolderPath ();

  if ( !cwd ) return alert.error ( 'You have to open a project or a file before opening it in the terminal' );

  if ( integrated ) {

    const term = vscode.window.createTerminal ({ cwd });

    term.show ( false );

  } else {

    const options = getOptions ();

    openInApp ( cwd, options.app );

  }

};

const open = (): Promise<void> => {

  return openWith ( false, false );

};

const openIntegrated = (): Promise<void> => {

  return openWith ( true, false );

};

const openRoot = (): Promise<void> => {

  return openWith ( false, true );

};

const openRootIntegrated = (): Promise<void> => {

  return openWith ( true, true );

};

/* EXPORT */

export {open, openIntegrated, openRoot, openRootIntegrated};
