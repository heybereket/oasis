export default function User(props) {
    
  return (
    <div class="mx-auto mt-16 p-8 max-w-lg flex">
  <img class="w-32 h-32 rounded-full" src={props.user.avatar} alt="Avatar"/>
  <div class="ml-4 flex flex-col justify-between">
    <div>
      <h1 class="flex items-center text-3xl font-medium leading-none">
        {props.user.name}
        <span class="verified relative">
          <div class="tooltip hidden p-2 absolute bg-black text-white text-xs rounded select-none">
            Verified
            
          </div>
         {(props.user.verified === true) && (
              <svg class="ml-2 w-8 h-8 text-blue-500 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
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

  );
}

export async function getStaticProps(context) {
  return await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/user', {
    method: 'POST',
    body: JSON.stringify({ username: context.params.username }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(json => {
      return { props: { user: json }, revalidate: 15 };
    });
}

export async function getStaticPaths() {
  return await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/users')
    .then(res => res.json())
    .then(json => {
      const paths = json.map(item => ({
        params: { username: item },
      }));

      return { paths, fallback: false };
    });
}
