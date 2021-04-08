import Wrapper from '../../utils/apiWrapper';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import Avatar from '../../components/Avatar';
import ActivityItem from '../../components/ActivityItem';
import TwitterIcon from '../../components/icons/Twitter';
import { MarkGithubIcon, CheckIcon, LinkIcon } from '@primer/octicons-react';
import SEO from '../../components/SEO';
import useSWR from 'swr';
const fetcher = url => fetch(url).then(r => r.json());

export default function User(props) {
  var { data, error } = useSWR('/api/auth', fetcher);

  return (
    <div className="flex flex-col min-h-screen bg-dark-tertiary">
      <SEO
        title={`${
          props.user.name
            ? `${props.user.name} (@${props.user.username}) / oasis.sh`
            : `@${props.user.username} / oasis.sh`
        }`}
      />

      <Navbar swrAuth={data} swrError={error} />
      <Container className={`mt-6 flex-col`}>
        <div
          className={`px-2 py-5 shadow-xl bg-dark-lighter rounded-3xl flex flex-col md:flex-row md:items-center`}
        >
          <div className={`mb-2 md:mb-0 ml-4`}>
            <Avatar user={props.user} size="lg" />
          </div>
          <div className={`flex flex-col ml-4`}>
            <h1 className={`text-gray-100 flex text-2xl leading-7 md:text-3xl font-bold mb-1`}>
              {props.user.name ? props.user.name : `@${props.user.username}`}
            </h1>
            {props.user.bio ? (
              <h1 className={`text-gray-200 text-xs md:text-sm font-mono mb-0.5`}>
                {props.user.bio}
              </h1>
            ) : null}

            <h1 className={`text-gray-300 text-xs font-mono`}>👋🏻 Joined {props.user.joined}</h1>

            <div className={`flex mt-2 text-gray-300 items-center`}>
              {props.user.verified && <CheckIcon className={`color-current w-6 h-6 mr-2`} />}

              <a href={`https://github.com/${props.user.username}`} target="_blank" rel="noopener">
                <MarkGithubIcon
                  className={`color-current hover:text-white w-5 h-5 transition duration-100 mr-2`}
                />
              </a>
              {props.user.twitter != null && (
                <a
                  href={`https://twitter.com/${props.user.twitter}`}
                  target="_blank"
                  rel="noopener"
                >
                  <TwitterIcon
                    className={`color-current hover:text-white w-5 h-5 transition duration-100 mr-2 `}
                  />
                </a>
              )}
              {props.user.link && (
                <a href={`${props.user.link}`} target="_blank" rel="noopener">
                  <LinkIcon
                    className={`color-current hover:text-white w-5 h-5 transition duration-100`}
                  />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className={`mt-6 grid grid-cols-12`}>
          <div
            className={`px-2 py-4 shadow-xl bg-dark-lighter rounded-3xl flex flex-col mb-2 col-span-12 md:col-span-6 md:mr-4 xl:col-span-7 2xl:col-span-8`}
          ></div>
          <div
            className={`px-10 py-6 shadow-xl bg-dark-lighter rounded-3xl flex flex-col mb-2 col-span-12 md:col-span-6 xl:col-span-5 2xl:col-span-4`}
          >
            <h1 className={` text-gray-300 font-mono font-semibold`}>Recent Activity</h1>
            {props.activity.length > 0 ? (
              props.activity.map(item => (
                <ActivityItem key={`${item.type}:${item.repo.full_name}`} event={item} />
              ))
            ) : (
              <h1 className={`text-gray-200 font-mono font-semibold text-md mt-2`}>
                <strong>@{props.user.username}</strong> has no activity yet.
              </h1>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps(context) {
  var user = await Wrapper.user(context.params.username);
  var activity = await Wrapper.activity(context.params.username, 7);

  return { props: { user, activity }, revalidate: 60 };
}

export async function getStaticPaths() {
  var users = await Wrapper.users('max');

  const paths = users.map(item => ({
    params: { username: item.username },
  }));

  return { paths, fallback: false };
}
