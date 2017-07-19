
/* IMPORT */

import * as vscode from 'vscode';

/* CONFIG */

const Config = {

  get ( extension = 'openInTerminal' ) {

    const config = vscode.workspace.getConfiguration ().get ( extension );

    return config as any;

  }

};

/* EXPORT */

export default Config;
