
/* IMPORT */

import * as absolute from 'absolute';
import * as openPath from 'open';
import * as path from 'path';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* COMMANDS */

async function open ( integrated = false, root = false ) {

  const {activeTextEditor} = vscode.window,
        {rootPath} = vscode.workspace,
        editorPath = activeTextEditor ? activeTextEditor.document.fileName : undefined,
        parentPath = editorPath && absolute ( editorPath ) && path.dirname ( editorPath ),
        folderPath = root ? rootPath : parentPath || rootPath;

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
