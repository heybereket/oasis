import Avatar from './Avatar';
import Container from './Container';
import { SearchIcon } from '@primer/octicons-react';

export default function Navbar(props) {
  return (
    <Container className="bg-dark-secondary flex items-center justify-between">
      <img className="w-12" src="/static/logo.svg" />

      <div className="inline-flex items-center text-white">
        <SearchIcon className={`w-5 h-5`} />
        <Avatar user={props.user} />
      </div>
    </Container>
  );
}
