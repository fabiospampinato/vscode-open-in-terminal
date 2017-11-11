
/* IMPORT */

import * as openPath from 'open';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* COMMANDS */

async function open ( integrated = false, root = false ) {

  const {activeTextEditor} = vscode.window,
        editorPath = activeTextEditor ? activeTextEditor.document.uri.fsPath : undefined,
        folderPath = Utils.folder.getWrapperPath ( editorPath, root );

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

function openRoot () {

  return open ( false, true );

}

function openRootIntegrated () {

  return open ( true, true );

}

/* EXPORT */

export {open, openIntegrated, openRoot, openRootIntegrated};
