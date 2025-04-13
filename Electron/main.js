const { app, BrowserWindow } = require('electron')
const path = require('path')

// ウィンドウを作成する関数
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // HTMLファイルを読み込む
  win.loadFile('index.html')
}

// Electronの初期化が完了したらウィンドウを作成
app.whenReady().then(() => {
  createWindow()

  // MacOSの場合、アプリをクリックしたときに新しいウィンドウを作成
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// すべてのウィンドウが閉じられたらアプリを終了（MacOS以外）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})