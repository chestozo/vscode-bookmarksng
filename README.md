# Bookmarks NG

Bookmark lines of code to ⚡️ quickly jump to later.  
Inspired by Sublime Text 3 Bookmarks.

<a href="https://github.com/chestozo/vscode-bookmarksng/blob/master/images/demo2.gif" target="_blank"><img src="https://github.com/chestozo/vscode-bookmarksng/blob/master/images/preview.png?raw=true" width="520px" alt="Click for demo gif" title="Click for demo gif" /></a>


## Shortcuts

These shortcuts are preset (can be modified in Settings):

- `Cmd+B` (`Ctrl+B`) — toggle bookmarks (multi-cursor supported)
- `Cmd+Shift+B` (`Ctrl+Shift+B`) — clear all bookmarks in current file
- `F2` — move cursor to the next bookmarked line of code (cursor is moved at the end of the line)
- `F2+Shift` — move cursor to the previous bookmarked line of code (cursor is moved at the end of the line)

## Features

- **multi-cursor supported!** — add multiple bookmarks with a single shortcut / command run
- **change bookmark icon color** to your taste 🌈
- bookmarks are set for lines (not for selection ranges)
- context dependent bookmarks toggle
  - for single cursor mode - normal bookmark toggle is performed
  - for multi-cursor - bookmarks are set if there is at least one line without a bookmark. Otherwise bookmarks are unset
- remove bookmarks inside multi-line selection on bookmark toggle. Works only for single multi-line selection
- navigation to next / previous bookmark with a shortcut

## Thank you!

<a href="https://paypal.me/rkartsev" target="_blank"><img src="https://github.com/chestozo/vscode-bookmarksng/blob/master/images/dbtn.png?raw=true" width="120px" /></a>

