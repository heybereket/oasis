import { BrowserWindow, app, screen } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import { isLinux, production } from './lib/constants';
import electronLogger from 'electron-log';
import dotenv from 'dotenv';

dotenv.config();

let win: BrowserWindow;
let splash: BrowserWindow;
const instanceLock = app.requestSingleInstanceLock();
let shouldShowWindow = false;
let windowShowInterval: NodeJS.Timeout;
let skipUpdateTimeout: NodeJS.Timeout;

electronLogger.transports.file.level = 'debug';
autoUpdater.logger = electronLogger;
autoUpdater.allowDowngrade = true;

// Browser Window Configuration
const createWindow = () => {
  const dimensions = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width: dimensions.width,
    height: dimensions.height,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  switch (process.env.SERVER ?? 'prod') {
    case 'local': {
      win.loadURL('http://localhost:3000');
      win.webContents.once('dom-ready', () => {
        win.webContents.openDevTools();
      });
      break;
    }

    case 'staging': {
      win.loadURL('https://dev.oasis.sh');
      break;
    }

    case 'prod': {
      win.loadURL('https://oasis.sh');
    }
  }

  win.once('ready-to-show', () => {
    shouldShowWindow = true;
  });

  // Force Close Application
  win.on('closed', () => {
    win.destroy();
  });
};

const createSplash = () => {
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
};

const skipUpdateCheck = (splash: BrowserWindow) => {
  createWindow();
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
        win.show();
      }, 800);
    }
  }, 1000);
};

if (!instanceLock) {
  if (process.env.hotReload) {
    app.relaunch();
  }
  app.exit();
} else {
  app.on('ready', async () => {
    createSplash();
    if (!production) skipUpdateCheck(splash);
    if (production && !isLinux) await autoUpdater.checkForUpdates();
    if (isLinux && production) {
      skipUpdateCheck(splash);
    }
  });
  app.on('second-instance', (event, argv, workingDirectory) => {
    if (win) {
      if (process.env.hotReload) return win.close();
      if (win.isMinimized()) win.restore();
      win.focus();
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
  const prog = Math.floor(progress.percent);
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
  app.quit();
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
