import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navbar } from '@components/MainNavbar';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Footer } from '@components/Footer';

const PostPage: React.FC = () => {
  const db = firebase.firestore();
  const [user] = useAuthState(firebase.auth());
  const [form, setForm] = useState({ topics: '', message: '' });

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto py-20">
        <h3>Hello {user?.displayName}!</h3>
        <p className="text-gray-300">
          Fill in the following fields to post your message
        </p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const messageLength = form.message
              .trim()
              .split(' ')
              .filter((x) => x !== '').length;
            if (messageLength > 200) {
              return console.error('Message too long');
            }
            if (messageLength < 1) {
              return console.error('Message too short');
            }
            const topics = form.topics
              .trim()
              .split(',')
              .filter((x) => x !== '');

            if (topics.length < 1) {
              return console.error('Add a topic');
            }
            if (topics.length > 4) {
              return console.error('You may have at most 4 topics');
            }

            const post = await db
              .collection('posts')
              .add({ ...form, likes: [] });

            db.collection('users')
              .doc(user?.uid)
              .update({
                posts: firebase.firestore.FieldValue.arrayUnion(post.id),
              });
          }}
        >
          <Input
            placeholder="Topics"
            className="max-w-md mt-10"
            onChange={(e) => setForm({ ...form, topics: e.target.value })}
            value={form.topics}
          />
          <Input
            placeholder="Your Message"
            className="max-w-xl mt-10 h-40"
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            value={form.message}
            textarea
          />
          <label htmlFor="" className="block text-gray-300 mt-2">
            {
              form.message
                .trim()
                .split(' ')
                .filter((x) => x !== '').length
            }
            /200 Words
          </label>
          <Button className="block mt-10">Send Post</Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PostPage;
