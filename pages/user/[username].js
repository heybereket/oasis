import Wrapper from '../../utils/apiWrapper';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import Avatar from '../../components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function User(props) {
  return (
    <div class="flex flex-col min-h-screen bg-dark-tertiary">
      <Navbar user={props.user} />
      <Container className={`mt-6 flex-col`}>
        <div class={`px-2 py-4 shadow-xl bg-dark-lighter rounded-3xl flex items-center`}>
          <Avatar user={props.user} size="lg" />
          <div class={`flex flex-col ml-4`}>
            <a className={`text-dark-text text-2xl md:text-3xl font-bold`}>{props.user.username}</a>
            <h1 className={`text-gray-200 text-xs md:text-sm font-mono`}>{props.user.bio}</h1>
            <div className={`flex mt-2`}>
              <a href={props.user.url}>
                <FontAwesomeIcon
                  icon={faGithub}
                  className={`text-white color-current hover:text-blue-300 text-2xl transition duration-100`}
                />
              </a>
            </div>
          </div>
        </div>
        <div className={`flex mt-6 flex-col md:flex-row`}>
          <div
            class={`px-2 py-4 shadow-xl bg-dark-lighter rounded-3xl flex items-center flex-grow md:flex-grow-0 md:w-72 lg:w-96 md:mr-4 mb-2`}
          ></div>
          <div
            class={`px-2 py-4 shadow-xl bg-dark-lighter rounded-3xl flex items-center flex-grow mb-2`}
          ></div>
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps(context) {
  var user = await Wrapper.user(context.params.username);
  return { props: { user }, revalidate: 15 };
}

export async function getStaticPaths() {
  var users = await Wrapper.users();

  const paths = users.map(item => ({
    params: { username: item.username },
  }));

  return { paths, fallback: false };
}
