
/* IMPORT */

import * as absolute from 'absolute';
import * as openPath from 'open';
import * as path from 'path';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* COMMANDS */

function open () {

  const {activeTextEditor} = vscode.window,
        editorPath = activeTextEditor ? activeTextEditor.document.fileName : undefined,
        folderPath = editorPath && absolute ( editorPath ) ? path.dirname ( editorPath ) : vscode.workspace.rootPath;

  if ( !folderPath ) return vscode.window.showErrorMessage ( 'You have to open a project or a file before opening it in Terminal' );

  const config = Config.get ();

  openPath ( folderPath, config.app );

}

/* EXPORT */

export {open};
