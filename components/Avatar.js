export default function Avatar(allProps) {
  const { user, size, ...props } = { ...allProps };

  switch (size) {
    case 'lg':
      return (
        <a
          {...props}
          className={`cursor-pointer mx-4 w-32 shadow-md rounded-3xl overflow-hidden ${props.className}`}
          href={`/user/${user.username}`}
        >
          <img src={user.avatar} />
        </a>
      );
    case 'sm':
      return (
        <a
          {...props}
          className={`cursor-pointer mx-4 w-8 shadow-md rounded-lg overflow-hidden ${props.className}`}
          href={`/user/${user.username}`}
        >
          <img src={user.avatar} />
        </a>
      );
    default:
      return (
        <a
          {...props}
          className={`cursor-pointer mx-4 w-8 shadow-md rounded-lg overflow-hidden ${props.className}`}
          href={`/user/${user.username}`}
        >
          <img src={user.avatar} />
        </a>
      );
  }
}
