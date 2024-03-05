
/* IMPORT */

import vscode from 'vscode';
import * as Commands from './commands';

/* MAIN */

const activate = (): void => {

  vscode.commands.registerCommand ( 'openInTerminal.open', Commands.open );
  vscode.commands.registerCommand ( 'openInTerminal.openIntegrated', Commands.openIntegrated );
  vscode.commands.registerCommand ( 'openInTerminal.openRoot', Commands.openRoot );
  vscode.commands.registerCommand ( 'openInTerminal.openRootIntegrated', Commands.openRootIntegrated );

};

/* EXPORT */

export {activate};
