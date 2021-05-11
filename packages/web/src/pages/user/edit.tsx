import {
  GetCurrentUserDocument,
  UpdateProfileDocument,
  UpdateProfileInput,
  useGetCurrentUserQuery,
} from '@oasis/client-gql';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/common/ssrRequest';
import { Formik, Form, Field } from 'formik';
import { Navbar } from '@components/navbar/Navbar';
import React from 'react';
import { StyledFormikInput } from '@components/common/FormikInput';
import { apolloClient } from '@lib/common/apolloClient';
import { Button } from '@components/common/Button';

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

  return (
    <>
      <Navbar />
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
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                label="Avatar URL"
                name="avatar"
                component={StyledFormikInput}
              />
              <Field label="Bio" name="bio" component={StyledFormikInput} />
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
