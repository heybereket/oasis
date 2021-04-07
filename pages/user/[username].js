import Wrapper from '../../utils/apiWrapper';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import Avatar from '../../components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
export default function User(props) {
  return (
    <div className="flex flex-col min-h-screen bg-dark-tertiary">
      <Navbar user={props.user} />
      <Container className={`mt-6 flex-col`}>
        <div className={`px-2 py-4 shadow-xl bg-dark-lighter rounded-3xl flex items-center`}>
          <Avatar user={props.user} size="lg" />
          <div className={`flex flex-col ml-1 md:ml-4`}>
            <div className={`flex items-center text-dark-text`}>
              <h1 className={`flex text-2xl leading-7 md:text-3xl font-bold`}>
                {props.user.name ? props.user.name : props.user.username}
              </h1>
            </div>
            <h1 className={`text-gray-200 text-xs md:text-sm font-mono`}>{props.user.bio}</h1>
            <div className={`flex mt-2`}>
              {props.user.verified ? (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={`text-gray-300 color-current text-2xl mr-2`}
                />
              ) : null}
              <a href={props.user.url}>
                <FontAwesomeIcon
                  icon={faGithub}
                  className={`text-gray-300 color-current hover:text-white text-2xl transition duration-100`}
                />
              </a>
            </div>
          </div>
        </div>
        <div className={`flex mt-6 flex-col md:flex-row`}>
          <div
            className={`px-2 py-4 shadow-xl bg-dark-lighter rounded-3xl flex items-center flex-grow md:flex-grow-0 md:w-72 lg:w-96 md:mr-4 mb-2`}
          ></div>
          <div
            className={`px-2 py-4 shadow-xl bg-dark-lighter rounded-3xl flex items-center flex-grow mb-2`}
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
