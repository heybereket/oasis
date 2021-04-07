export default function Avatar(allProps) {
  const { user, size, ...props } = { ...allProps };

  switch (size) {
    case 'lg':
      return (
        <div
          {...props}
          className={`mx-4 w-32 shadow-md rounded-3xl overflow-hidden ${props.className}`}
          href={`/user/${user.username}`}
        >
          <img src={user.avatar} />
        </div>
      );
    case 'sm':
      return (
        <div
          {...props}
          className={`mx-4 w-8 shadow-md rounded-lg overflow-hidden ${props.className}`}
          href={`/user/${user.username}`}
        >
          <img src={user.avatar} />
        </div>
      );
    default:
      return (
        <div
          {...props}
          className={`mx-4 w-8 shadow-md rounded-lg overflow-hidden ${props.className}`}
          href={`/user/${user.username}`}
        >
          <img src={user.avatar} />
        </div>
      );
  }
}
