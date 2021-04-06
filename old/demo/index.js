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
            <div class="mx-auto p-8 max-w-lg flex">
              <img class="w-32 h-32 rounded-full" src={props.user.avatar} alt="Avatar" />
              <div class="ml-4 flex flex-col justify-between">
                <div>
                  <h1 class="flex items-center text-3xl font-medium leading-none">
                    {props.user.name ? props.user.name : props.user.username}
                    <span class="verified relative">
                      <div class="tooltip hidden p-2 absolute bg-black text-white text-xs rounded select-none">
                        Verified
                      </div>
                      {props.user.verified === true && (
                        <svg
                          class="ml-2 w-7 h-7 text-blue-500 fill-current"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </span>
                  </h1>
                  <h1 class="text-gray-800 mb-2">{props.user.bio}</h1>

                  <h1 className={`text-xs text-gray-500 font-mono`}>
                    🏆 Joined {props.user.joined}
                  </h1>
                </div>
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
  await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + '/users')
    .then(res => res.json())
    .then(async json => {
      if (!json[0]) return (data.props.user = {});
      await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + '/user', {
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
