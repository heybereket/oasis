export default function User(props) {
  return (
    <div
      className={`m-4 rounded-md shadow-md w-80 h-32 flex px-4 items-center`}
    >
      <img className={`w-16 rounded-full`} src={props.data.avatar}></img>
      <div className={`ml-2 flex flex-col`}>
        <h1 className={`text-xl font-semibold`}>{props.data.username}</h1>
        <h1 className={`text-xs text-gray-500 font-mono`}>{props.data.uid}</h1>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  return await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/user", {
    method: "POST",
    body: JSON.stringify({ username: context.params.username }),
  })
    .then((res) => res.json())
    .then((json) => {
      return { props: { data: json.data }, revalidate: 30 };
    });
}

export async function getStaticPaths() {
  return await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/users")
    .then((res) => res.json())
    .then((json) => {
      const paths = json.map((item) => ({
        params: { username: item.username },
      }));

      return { paths, fallback: false };
    });
}
