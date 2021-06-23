import {
  GetCurrentUserDocument,
  UpdateProfileDocument,
  UpdateProfileInput,
  useGetCurrentUserQuery,
} from '@oasis-sh/react-gql';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/common/ssrRequest';
import { Formik, Form, Field } from 'formik';
import { Navbar, Button, StyledFormikInput } from '@oasis-sh/ui';
import React from 'react';
import { apolloClient } from '@lib/apollo';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { login, logout } from '@lib/auth/login';

interface EditProfileProps {
  initialApolloState: any;
}

const EditProfile: React.FC<EditProfileProps> = () => {
  const origData = useGetCurrentUserQuery().data?.currentUser;
  const initialValues: UpdateProfileInput = {
    avatar: origData?.avatar,
    bio: origData?.bio,
    banner: origData?.banner,
    name: origData?.name,
    username: origData?.username,
  };

  const { user, currentUserLoading } = useGetCurrentUser();

  return (
    <>
      <Navbar
        user={user}
        currentUserLoading={currentUserLoading}
        login={login}
        logout={logout}
      />
      <div className="w-1/2 mx-auto">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              setSubmitting(true);
              const data: UpdateProfileInput = {};
              Object.keys(values).forEach((key) => {
                if ((values as any)[key] === '') {
                  (data as any)[key] = null;
                } else if ((values as any)[key] !== (origData as any)[key]) {
                  (data as any)[key] = (values as any)[key];
                }
              });
              const res = await apolloClient.mutate({
                mutation: UpdateProfileDocument,
                variables: { data },
              });
              console.log(res);
              setSubmitting(false);
              window.location.reload();
            })();
          }}
        >
          {({ values, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                label="Avatar URL"
                name="avatar"
                component={StyledFormikInput}
              />
              <label>Bio</label>
              <textarea
                name="bio"
                onChange={handleChange}
                value={values.bio ?? ''}
                className="w-full py-2 px-4 rounded-lg text-gray-100 placeholder-gray-300 bg-gray-700 border border-gray-600 focus:outline-none focus:ring shadow-lg"
              />
              <Field
                label="Banner"
                name="banner"
                component={StyledFormikInput}
              />
              <Field
                label="Display Name"
                name="name"
                component={StyledFormikInput}
              />
              <Field
                label="Username"
                name="username"
                component={StyledFormikInput}
              />
              <Field type="submit" as={Button}>
                Submit
              </Field>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<EditProfileProps> = async ({
  req,
}) => {
  return {
    props: {
      initialApolloState: await ssrRequest(req, [
        {
          document: GetCurrentUserDocument,
        },
      ]),
    },
  };
};

export default EditProfile;
