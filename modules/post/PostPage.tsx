import firebase from "firebase/app";
import "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navbar } from "../../components/AuthNavbar";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

const PostPage: React.FC = () => {
  const [user] = useAuthState(firebase.auth());
  const [form, setForm] = useState({ topics: "", message: "" });

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto py-20">
        <h3>Hello {user?.displayName}!</h3>
        <p className="text-gray-300">
          Fill in the following fields to post your message
        </p>
        <form
          onSubmit={(e) => {
            console.log(form);
            e.preventDefault();
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
            {form.message.split(" ").length - 1}/200 Words
          </label>
          <Button className="block mt-10">Send Post</Button>
        </form>
      </div>
    </div>
  );
};

export default PostPage;
