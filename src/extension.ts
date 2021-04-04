import * as vscode from 'vscode'
import { bookmarksManager } from './bookmarks'

const DEFAULT_COLOR = '#333'

const getIconContents = (iconColor: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="${iconColor}"><path d="M7 5v23l1.594-1.188L16 21.25l7.406 5.563L25 28V5H7zm2 2h14v17l-6.406-4.813L16 18.75l-.594.438L9 24V7z"/></svg>`

export function activate(context: vscode.ExtensionContext) {
  bookmarksManager.init(context)

  context.subscriptions.push(
    vscode.commands.registerCommand('bookmarksNG.toogleBookmarks', () => {
      bookmarksManager.toggleBookmarks(context)
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('bookmarksNG.clearAllBookmarks', () => {
      bookmarksManager.clearAllBookmarks(context)
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'bookmarksNG.navigateToNextBookmark',
      () => {
        bookmarksManager.navigateToNext()
      }
    )
  )

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'bookmarksNG.navigateToPrevBookmark',
      () => {
        bookmarksManager.navigateToPrev()
      }
    )
  )

  // Load bookmarks after active file changes.
  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      bookmarksManager.loadForFile(editor?.document.uri.fsPath, context)
    },
    null,
    context.subscriptions
  )

  // The only way for now to keep bookmarks positions in sync with what is shown in VS Code.
  // @see https://github.com/microsoft/vscode/issues/54147
  vscode.workspace.onDidChangeTextDocument((event) => {
    bookmarksManager.handleTextChanges(context, event.contentChanges)
  })

  vscode.workspace.onDidChangeConfiguration(async (evt) => {
    const iconColor = vscode.workspace
      .getConfiguration('bookmarksNG')
      .get<string>('iconColor', '#333')

    if (!evt.affectsConfiguration('bookmarksNG.iconColor')) {
      return
    }

    const userResponse = await vscode.window.showInformationMessage(
      `Changing icon color requires a reload`,
      'Reload now'
    )

    if (userResponse === 'Reload now') {
      await vscode.workspace.fs.writeFile(
        vscode.Uri.parse(context.asAbsolutePath('images/icon.svg')),
        Buffer.from(getIconContents(iconColor))
      )
      await vscode.workspace.fs.writeFile(
        vscode.Uri.parse(context.asAbsolutePath('images/icond.svg')),
        Buffer.from(getIconContents(iconColor))
      )

      vscode.commands.executeCommand('workbench.action.reloadWindow')
    }
  })
}

export function deactivate() {}
