import { useState } from 'react';

export default function User(props) {
  var [currentDemo, setCurrentDemo] = useState('User');
  var [demoMode, setDemoMode] = useState('ui');

  return (
    <div className={`w-screen h-screen flex flex-col items-center justify-center`}>
      <h1 className={`text-2xl font-semibold mb-2`}>Oasis API Tester/Demo(s)</h1>
      <div className={`flex max-w-4xl items-center`}>
        <button
          onClick={() => {
            setDemoMode('ui');
            setCurrentDemo('User');
          }}
          className={`bg-red-400 px-4 py-2 rounded-xl text-white shadow-lg font-mono mr-2 hover:bg-red-600 transition duration-200`}
        >
          User
        </button>
        <button
          //   onClick={() => setCurrentDemo('Repo')}
          disabled
          className={`bg-red-200  px-4 py-2 rounded-xl text-white shadow-lg font-mono mr-2 cursor-not-allowed`}
        >
          Repo
        </button>
        <button
          onClick={() => {
            setDemoMode('ui');
            setCurrentDemo('Authentication');
          }}
          className={`bg-red-400 px-4 py-2 rounded-xl text-white shadow-lg font-mono hover:bg-red-600 transition duration-200`}
        >
          Authentication
        </button>
      </div>
      <div
        className={`shadow-md w-5/6 lg:w-4/6 h-3/6 bg-gray-50 my-4 rounded-xl flex flex-col items-center px-4 py-2`}
      >
        <div className={`flex flex-row w-full border-b pb-2 items-center `}>
          <h1 className={`font-semibold`}>{currentDemo} Demo</h1>
          <div className={`flex-grow`}></div>
          <div>
            <button
              onClick={() => setDemoMode('ui')}
              className={`border-red-200 border-2 border-r py-0.5 px-2 color-current text-red-700 rounded-l-xl hover:bg-red-400 hover:text-white transition duration-200`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>

            {currentDemo !== 'Authentication' ? (
              <button
                onClick={() => setDemoMode('code')}
                className={`border-red-200 border-2 border-l py-0.5 px-2 color-current text-red-700 rounded-r-xl hover:bg-red-400 hover:text-white transition duration-200`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </button>
            ) : (
              <button
                className={`border-red-200 border-2 border-l py-0.5 px-2 color-current text-red-700 rounded-r-xl bg-red-100 cursor-not-allowed`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className={`bg-white rounded-b-xl shadow-sm w-full h-full`}>
          {demoMode === 'ui' ? (
            <UIDemo demo={currentDemo} props={props} />
          ) : (
            <CodeDemo demo={currentDemo} props={props} />
          )}
        </div>
      </div>
    </div>
  );
}

export function UIDemo(context) {
  switch (context.demo) {
    case 'User':
      var props = context.props;
      return (
        <div className={`w-full h-full flex flex-col items-center justify-center`}>
          {props.user.uid ? (
            <div className={`m-4 rounded-md shadow-md py-6 flex px-4 items-center`}>
              <img className={`w-24 rounded-full`} src={props.user.avatar}></img>
              <div className={`ml-4 flex flex-col`}>
                <a
                  href={props.user.url}
                  className={`text-xl font-semibold hover:text-blue-500 hover:underline`}
                >
                  {props.user.username}
                </a>
                <h1 className={`text-gray-700 mb-2`}>{props.user.bio}</h1>
                <h1 className={`text-xs text-gray-500 font-mono`}>User ID: {props.user.uid}</h1>
                <h1 className={`text-xs text-gray-500 font-mono`}>
                  Date Created: {new Date(props.user.created._seconds * 1000).toLocaleDateString()}
                </h1>
              </div>
            </div>
          ) : (
            <div className={`text-center`}>
              <h1 className={`text-xl font-semibold font-mono text-red-600`}>
                Error: Your Firestore database has no users.
              </h1>
              <h1 className={`text-sm mt-2 font-mono text-gray-400`}>
                You may need to reload to refresh the data.
              </h1>
            </div>
          )}
        </div>
      );
      break;
    case 'Authentication':
      return (
        <div className={`w-full h-full flex flex-col items-center justify-center`}>
          <iframe className={`w-full h-full`} src="/demo/auth"></iframe>
        </div>
      );
  }
}

export function CodeDemo(context) {
  switch (context.demo) {
    case 'User':
      var props = context.props;
      if (!props.user.uid)
        return (
          <textarea
            className={`w-full h-full font-mono text-xs p-4 outline-none resize-none`}
            readOnly
            value={`{}`}
          ></textarea>
        );

      return (
        <textarea
          className={`w-full h-full font-mono text-xs p-4 outline-none resize-none`}
          readOnly
          value={
            `GET ${process.env.NEXT_PUBLIC_BASE_URL}/api/user\nBody: {"username":"${props.user.username}"}\n\n` +
            JSON.stringify(props.user, null, 3)
          }
        ></textarea>
      );
  }
}

export async function getStaticProps(context) {
  var data = { props: {}, revalidate: 30 };

  // Fetch user-data
  await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/users')
    .then(res => res.json())
    .then(async json => {
      if (!json[0]) return (data.props.user = {});
      await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/user', {
        method: 'POST',
        body: JSON.stringify({ username: json[Math.floor(Math.random() * json.length)] }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(body => {
          data.props.user = body;
        });
    });

  return data;
}
