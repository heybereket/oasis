import firebase from 'firebase';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navbar } from '../../components/AuthNavbar';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

const PostPage: React.FC = () => {
  const [user] = useAuthState(firebase.auth());

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto py-20">
        <h3>Hello {user?.displayName}!</h3>
        <p className="text-gray-300">Fill in the following fields to post your message</p>
        <Input placeholder="Topics" className="max-w-md mt-10" />
        <Input placeholder="Your Message" className="max-w-xl mt-10 h-40" textarea />
        <label htmlFor="" className="block text-gray-300 mt-2">0/200 Words</label>
        <Button className="block mt-10">Send Post</Button>
      </div>
    </div>
  );
}

export default PostPage;