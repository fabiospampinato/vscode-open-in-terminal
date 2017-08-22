
/* IMPORT */

import * as absolute from 'absolute';
import * as openPath from 'open';
import * as path from 'path';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* COMMANDS */

async function open ( integrated = false ) {

  const {activeTextEditor} = vscode.window,
        editorPath = activeTextEditor ? activeTextEditor.document.fileName : undefined,
        folderPath = editorPath && absolute ( editorPath ) ? path.dirname ( editorPath ) : vscode.workspace.rootPath;

  if ( !folderPath ) return vscode.window.showErrorMessage ( 'You have to open a project or a file before opening it in Terminal' );

  if ( integrated ) {

    const term = vscode.window.createTerminal ( 'Terminal' );

    await term.processId;
    await Utils.delay ( 200 );

    term.sendText ( `cd ${folderPath}`, true );

    term.show ( false );

  } else {

    const config = Config.get ();

    openPath ( folderPath, config.app );

  }

}

function openIntegrated () {

  return open ( true );

}

/* EXPORT */

export {open, openIntegrated};
