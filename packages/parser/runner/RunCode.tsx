import { Modal } from '@oasis-sh/ui';
import { OasisDark } from '../markdown/themes/OasisDark';
import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';

type Props = {
  languageMatch: RegExpExecArray | null;
  code: any;
  exraProps: any;
  runtimes: any;
};

export const RunCode: React.FC<Props> = ({
  languageMatch,
  code,
  exraProps,
  runtimes,
}) => {
  const [language, setLanguage] = useState<string>();
  const [version, setVersion] = useState<string>();
  const [runnable, setRunnable] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [output, setOutput] = useState('');
  useEffect(() => {
    let languageTemp = languageMatch?.[1];
    if (languageTemp !== undefined) {
      if (languageTemp.slice(0, 1) === '*') {
        languageTemp = languageTemp.slice(1);
        (runtimes ?? []).forEach((element: any) => {
          if ((element.aliases as string[]).includes(languageTemp ?? '')) {
            setVersion(element.version);
            setRunnable(true);
          }
        });
      }
    }
    setLanguage(languageTemp);
  }, [runtimes]);

  return (
    <div className="relative">
      <SyntaxHighlighter
        style={OasisDark}
        language={language}
        PreTag="div"
        className="rounded-lg shadow-sm"
        wrapLongLines={true}
        {...exraProps}
      >
        {String(code).replace(/\n$/, '')}
      </SyntaxHighlighter>
      {runnable && (
        <div
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => {
            (async () => {
              const res = await fetch(
                'https://emkc.org/api/v2/piston/execute',
                {
                  method: 'POST',
                  body: JSON.stringify({
                    language,
                    version,
                    files: [
                      {
                        content: String(code),
                      },
                    ],
                  }),
                }
              );
              const json = await res.json();
              setOutput(json.run.output);
              setOpen(true);
            })();
          }}
        >
          ▶️
        </div>
      )}
      <Modal
        open={isOpen}
        closeHandler={() => setOpen(false)}
        className="w-screen lg:w-1/2 text-xl whitespace-pre-wrap"
      >
        {output}
      </Modal>
    </div>
  );
};
