import {
  BrowserWindow,
  app,
  screen,
  ipcMain,
  shell,
  Menu,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import {
  ALLOWED_HOSTS,
  isLinux,
  MENU_TEMPLATE,
  isMac,
  isWin,
  production,
} from './lib/constants';
import electronLogger from 'electron-log';

let mainWindow: BrowserWindow;
let splash: BrowserWindow;

let menu: Menu;
const instanceLock = app.requestSingleInstanceLock();
let shouldShowWindow = false;
let windowShowInterval: NodeJS.Timeout;
let skipUpdateTimeout: NodeJS.Timeout;

electronLogger.transports.file.level = 'debug';
autoUpdater.logger = electronLogger;
autoUpdater.allowDowngrade = true;

// Browser Window Configuration
const createMainWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
  });

  // applying custom menu
  menu = Menu.buildFromTemplate(MENU_TEMPLATE);
  Menu.setApplicationMenu(menu);
  mainWindow.loadURL(production ? `https://dev.oasis.sh` : 'http://localhost:3000');

  mainWindow.once('ready-to-show', () => {
    shouldShowWindow = true;
  });

  // graceful exiting
  mainWindow.on('closed', () => {
    mainWindow.destroy();
  });

  // handling external links
  const handleLinks = (event: any, url: string) => {
    let urlObj = new URL(url);
    let urlHost = urlObj.hostname;
    if (!ALLOWED_HOSTS.includes(urlHost)) {
      event.preventDefault();
      shell.openExternal(url);
    } else {
      if (
        urlHost == ALLOWED_HOSTS[1] &&
        urlObj.pathname !== '/login' &&
        urlObj.pathname !== '/session' &&
        urlObj.pathname !== '/sessions/two-factor'
      ) {
        event.preventDefault();
        shell.openExternal(url);
      }
    }
  };
  mainWindow.webContents.on('new-window', handleLinks);
  mainWindow.webContents.on('will-navigate', handleLinks);

  ipcMain.on('@app/version', (event, args) => {
    event.sender.send('@app/version', app.getVersion());
  });

  ipcMain.on('@app/hostPlatform', (event, args) => {
    event.sender.send('@app/hostPlatform', {
      isLinux,
      isMac,
      isWin,
    });
  });

  ipcMain.on('@app/quit', (event, args) => {
    mainWindow.close();
  });
  ipcMain.on('@app/maximize', (event, args) => {
    if (isMac) {
      if (mainWindow.isFullScreenable()) {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
      }
    } else {
      if (mainWindow.maximizable) {
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
        } else {
          mainWindow.maximize();
        }
      }
    }
  });
  ipcMain.on('@app/minimize', (event, args) => {
    if (mainWindow.minimizable) {
      mainWindow.minimize();
    }
  });
}

function createSpalshWindow() {
  splash = new BrowserWindow({
    width: 300,
    height: 410,
    transparent: true,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  splash.loadFile(
    path.join(__dirname, '../resources/splash/splash-screen.html')
  );

  splash.webContents.on('did-finish-load', () => {
    splash.webContents.send('@locale/text', {
      title: 'Oasis',
      check: 'Checking for updates...',
      download: 'Downloading Updates...',
      relaunch: 'Relaunching...',
      launch: 'Launching...',
      skipCheck: 'Skipping update checks...',
      notfound: 'No updates found...',
    });
  });
}

if (!instanceLock) {
  if (process.env.hotReload) {
    app.relaunch();
  }
  app.exit();
} else {
  app.on('ready', async () => {
    createSpalshWindow();
    if (!production) skipUpdateCheck(splash);
    if (production && !isLinux) await autoUpdater.checkForUpdates();
    if (isLinux && production) {
      skipUpdateCheck(splash);
    }
  });
  app.on('second-instance', (event, argv, workingDirectory) => {
    if (mainWindow) {
      if (process.env.hotReload) return mainWindow.close();
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

autoUpdater.on('update-available', (info) => {
  splash.webContents.send('download', info);
  // skip the update if it takes more than 1 minute
  skipUpdateTimeout = setTimeout(() => {
    skipUpdateCheck(splash);
  }, 60000);
});
autoUpdater.on('download-progress', (progress) => {
  let prog = Math.floor(progress.percent);
  splash.webContents.send('percentage', prog);
  splash.setProgressBar(prog / 100);
  // stop timeout that skips the update
  if (skipUpdateTimeout) {
    clearTimeout(skipUpdateTimeout);
  }
});
autoUpdater.on('update-downloaded', () => {
  splash.webContents.send('relaunch');
  // stop timeout that skips the update
  if (skipUpdateTimeout) {
    clearTimeout(skipUpdateTimeout);
  }
  setTimeout(() => {
    autoUpdater.quitAndInstall();
  }, 1000);
});
autoUpdater.on('update-not-available', () => {
  skipUpdateCheck(splash);
});
app.on('window-all-closed', async () => {
  app.exit();
});
app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

function skipUpdateCheck(splash: BrowserWindow) {
  createMainWindow();
  splash.webContents.send('notfound');
  if (isLinux || !production) {
    splash.webContents.send('skipCheck');
  }
  // stop timeout that skips the update
  if (skipUpdateTimeout) {
    clearTimeout(skipUpdateTimeout);
  }
  windowShowInterval = setInterval(() => {
    if (shouldShowWindow) {
      splash.webContents.send('launch');
      clearInterval(windowShowInterval);
      setTimeout(() => {

       splash.destroy();
        mainWindow.show();
      }, 800);
    }
  }, 1000);
}
