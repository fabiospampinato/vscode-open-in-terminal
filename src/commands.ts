
/* IMPORT */

import * as absolute from 'absolute';
import * as openPath from 'open';
import * as path from 'path';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* COMMANDS */

async function open ( integrated = false, workspaceRootFolder = false ) {

  const {activeTextEditor} = vscode.window,
        editorPath = activeTextEditor ? activeTextEditor.document.fileName : undefined;

  let folderPath;
  if ( editorPath ) {
    if ( workspaceRootFolder ) {
      // VSCode vscode.d.ts does not define prop workspaceFolders yet
      // const workspaceFolder = vscode.workspace.workspaceFolders.find(f => editorPath.match(`${path.sep}${f.name}${path.sep}?`));
      const workspaceFolder = (vscode.workspace as any).workspaceFolders.find(f => editorPath.match(`${path.sep}${f.name}${path.sep}?`));
      folderPath = workspaceFolder && workspaceFolder.uri.path;
    }

    // fallback to file base editorPath
    folderPath = folderPath || (absolute(editorPath) ? path.dirname(editorPath) : vscode.workspace.rootPath);
  }

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

function openWorkspaceRoot () {

  return open ( false, true );

}

function openWorkspaceRootIntegrated () {

  return open ( true, true );

}

/* EXPORT */

export {open, openIntegrated, openWorkspaceRoot, openWorkspaceRootIntegrated};
