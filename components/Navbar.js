import Avatar from './Avatar';
import Container from './Container';
import { BellIcon, BookmarkIcon } from '@primer/octicons-react';
import NavProfile from './NavProfile';

export default function Navbar(props) {
  return (
    <Container className="bg-dark-secondary flex items-center justify-between">
      <img className="w-12" src="/static/logo.svg" />

      <div className="inline-flex items-center text-white">
        <BookmarkIcon className={`w-5 h-5 mr-3`} />
        <BellIcon className={`w-5 h-5`} />
        <NavProfile swrAuth={props.swrAuth} swrError={props.swrError} />
      </div>
    </Container>
  );
}
