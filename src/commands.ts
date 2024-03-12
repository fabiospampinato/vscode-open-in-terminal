
/* IMPORT */

import vscode from 'vscode';
import {alert, getActiveFolderPath, getConfig, getProjectRootPath, openInApp} from 'vscode-extras';

/* MAIN */

const open = async ( integrated: boolean = false, root: boolean = false ): Promise<void> => {

  const targetPath = root ? getProjectRootPath () : getActiveFolderPath ();

  if ( !targetPath ) return alert.error ( 'You have to open a project or a file before opening it in Terminal' );

  if ( integrated ) { // Opening in the integrated terminal

    const term = vscode.window.createTerminal ({
      cwd: targetPath
    });

    term.show ( false );

  } else { // Opening in an external terminal

    const config = getConfig ( 'openInTerminal' );
    const app = config?.app || 'Terminal';

    openInApp ( targetPath, app );

  }

};

const openIntegrated = (): Promise<void> => {

  return open ( true, false );

};

const openRoot = (): Promise<void> => {

  return open ( false, true );

};

const openRootIntegrated = (): Promise<void> => {

  return open ( true, true );

};

/* EXPORT */

export {open, openIntegrated, openRoot, openRootIntegrated};
