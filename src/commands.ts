
/* IMPORT */

import path from 'node:path';
import openPath from 'tiny-open';
import vscode from 'vscode';
import {getActiveFilePath, getConfig, getProjectRootPath} from 'vscode-extras';

/* MAIN */

const open = async ( integrated: boolean = false, root: boolean = false ): Promise<void> => {

  const rootPath = getProjectRootPath ();
  const filePath = getActiveFilePath ();
  const targetPath = root ? rootPath : ( filePath ? path.dirname ( filePath ) : rootPath );

  if ( !targetPath ) return void vscode.window.showErrorMessage ( 'You have to open a project or a file before opening it in Terminal' );

  if ( integrated ) {

    const term = vscode.window.createTerminal ({
      cwd: targetPath
    });

    term.show ( false );

  } else {

    const config = getConfig ( 'openInTerminal' );
    const app = config?.app || 'Terminal';

    openPath ( targetPath, { app } );

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
