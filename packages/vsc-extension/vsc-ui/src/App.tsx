import React, { useState } from 'react';
import { vscode } from './vscode';

export function App() {
  const [opened, setOpened] = useState(false);

  const openLogin = () => {
    vscode.postMessage({ type: 'open-login' });
    setOpened(true);
  };

  const done = () => {
    vscode.postMessage({
      type: 'logged-in',
    });
  };

  return (
    <div>
      {!opened && <button onClick={openLogin}>Login</button>}
      {opened && <button onClick={done}>Done</button>}
    </div>
  );
}
