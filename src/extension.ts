import * as vscode from 'vscode'
import { bookmarksManager } from './bookmarks'

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
    bookmarksManager.loadForFile(event?.document.uri.fsPath, context)
    bookmarksManager.handleTextChanges(context, event.contentChanges)
  })
}

export function deactivate() {}
