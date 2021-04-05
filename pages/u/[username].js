import Head from 'next/head'

export default function User(props) {
  return (
    <div className={`w-screen h-screen flex flex-col items-center justify-center`}>
      <Head>
        <link rel="shortcut icon" className={`w-20 rounded-full`} href={props.data.avatar} />
        <title>@{props.data.username} | Oasis</title>
      </Head>

      <div className={`m-4 rounded-md shadow-md py-6 flex px-4 items-center`}>
        <img className={`w-24 rounded-full`} src={props.data.avatar}></img>
        <div className={`ml-4 flex flex-col`}>
          <a
            href={props.data.url}
            className={`text-xl font-semibold hover:text-blue-500 hover:underline`}
          >
            {props.data.username}
          </a>
          <h1 className={`text-gray-700 mb-2`}>{props.data.bio}</h1>
          <h1 className={`text-xs text-gray-500 font-mono`}>User ID: {props.data.uid}</h1>
          <h1 className={`text-xs text-gray-500 font-mono`}>
            Date Created: {new Date(props.data.created._seconds * 1000).toLocaleDateString()}
          </h1>
        </div>
      </div>

      <h1 className={`mt-4 text-xs text-gray-500 font-mono max-w-2xl text-center`}>
        From the Public API, this is all the data anybody can access about you. (ID, Avatar,
        Username, Creation Date, Bio, Name (only avaliable if set on GitHub), and your Github URL)
      </h1>
    </div>
  )
}

export async function getStaticProps(context) {
  return await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/user', {
    method: 'POST',
    body: JSON.stringify({ username: context.params.username }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(json => {
      return { props: { data: json }, revalidate: 15 }
    })
}

export async function getStaticPaths() {
  return await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/users')
    .then(res => res.json())
    .then(json => {
      const paths = json.map(item => ({
        params: { username: item },
      }))

      return { paths, fallback: false }
    })
}
