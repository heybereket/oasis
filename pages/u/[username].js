export default function User(props) {
  return (
    <div className={`w-screen h-screen flex items-center justify-center`}>
      <div className={`m-4 rounded-md shadow-md h-32 flex px-4 items-center`}>
        <img className={`w-20 rounded-full`} src={props.data.avatar}></img>
        <div className={`ml-4 flex flex-col`}>
          <h1 className={`text-xl font-semibold`}>{props.data.username}</h1>
          <h1 className={`text-gray-700 mb-2`}>{props.data.bio}</h1>
          <h1 className={`text-xs text-gray-500 font-mono`}>
            User ID: {props.data.uid}
          </h1>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  return await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/user", {
    method: "POST",
    body: JSON.stringify({ username: context.params.username }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => {
      return { props: { data: json }, revalidate: 15 };
    });
}

export async function getStaticPaths() {
  return await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/users")
    .then((res) => res.json())
    .then((json) => {
      const paths = json.map((item) => ({
        params: { username: item },
      }));

      return { paths, fallback: false };
    });
}