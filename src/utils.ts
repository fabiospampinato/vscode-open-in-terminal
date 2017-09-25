
/* IMPORT */

import * as _ from 'lodash';
import * as absolute from 'absolute';
import * as path from 'path';
import * as vscode from 'vscode';
import * as Commands from './commands';

/* UTILS */

const Utils = {

  initCommands ( context: vscode.ExtensionContext ) {

    const {commands} = vscode.extensions.getExtension ( 'fabiospampinato.vscode-open-in-terminal' ).packageJSON.contributes;

    commands.forEach ( ({ command, title }) => {

      const commandName = _.last ( command.split ( '.' ) ) as string,
            handler = Commands[commandName],
            disposable = vscode.commands.registerCommand ( command, () => handler () );

      context.subscriptions.push ( disposable );

    });

    return Commands;

  },

  delay ( ms ) {

    return new Promise ( resolve => setTimeout ( resolve, ms ) );

  },

  folder: {

    getParentPath ( basePath? ) {

      return basePath && absolute ( basePath ) && path.dirname ( basePath );

    },

    getRootPath ( basePath? ) {

      const {workspaceFolders} = vscode.workspace;

      if ( !workspaceFolders ) return;

      const firstRootPath = workspaceFolders[0].uri.fsPath;

      if ( !basePath || !absolute ( basePath ) ) return firstRootPath;

      const rootPaths = workspaceFolders.map ( folder => folder.uri.fsPath ),
            sortedRootPaths = _.sortBy ( rootPaths, [path => path.length] ).reverse (); // In order to get the closest root

      return sortedRootPaths.find ( rootPath => basePath.startsWith ( rootPath ) );

    },

    getWrapperPath ( basePath, root? ) {

      const parentPath = () => Utils.folder.getParentPath ( basePath ),
            rootPath = () => Utils.folder.getRootPath ( basePath );

      return root ? rootPath () : parentPath () || rootPath ();

    }

  }

};

/* EXPORT */

export default Utils;
