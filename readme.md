# Open in Terminal

<p align="center">
  <img src="https://raw.githubusercontent.com/fabiospampinato/vscode-open-in-terminal/master/resources/logo.png" width="128" alt="Logo">
</p>

Adds a few commands for opening the current project in Terminal.

It can be configured to use whichever terminal app you want.

## Install

Follow the instructions in the [Marketplace](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-open-in-terminal), or run the following in the command palette:

```shell
ext install fabiospampinato.vscode-open-in-terminal
```

## Usage

It adds 4 commands to the command palette:

```js
'Open in Terminal' // Open the current folder in the terminal
'Open Root in Terminal' // Open the current project in the terminal
'Open in Integrated Terminal' // Open the current folder in the integrated terminal
'Open Root in Integrated Terminal' // Open the current project in the integrated terminal
```

## Settings

```js
{
  "openInTerminal.app": "Terminal" // The name of your terminal app
}
```

## Contributing

If you found a problem, or have a feature request, please open an [issue](https://github.com/fabiospampinato/vscode-open-in-terminal/issues) about it.

If you want to make a pull request you can debug the extension using [Debug Launcher](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-debug-launcher).

## License

MIT © Fabio Spampinato
