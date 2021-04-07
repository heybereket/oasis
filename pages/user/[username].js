import Wrapper from '../../utils/apiWrapper';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import Avatar from '../../components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faYoutube,  } from '@fortawesome/free-brands-svg-icons';

export default function User(props) {
  return (
    <div className="flex flex-col min-h-screen bg-dark-tertiary">
      <Navbar user={props.user} />
      <Container className={`mt-6 flex-col`}>
        <div className={`px-2 py-4 shadow-xl bg-dark-lighter rounded-3xl flex items-center`}>
          <Avatar user={props.user} size="lg" />
          <div className={`flex flex-col ml-4`}>
            <a className={`flex text-dark-text text-2xl md:text-3xl font-bold`}>{props.user.name} {props.user.verified === true &&  <svg class="svg-inline--fa fa-check-circle fa-w-13 mt-1 ml-2 fa-1x" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>}</a>
            <h1 className={`text-gray-200 text-xs md:text-sm font-mono`}>{props.user.bio}</h1>
            <div className={`flex mt-2`}>
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
