import React from 'react';
import { login, logout } from '@lib/auth/login';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { ssrRequest } from '@lib/common/ssrRequest';
import {
  GetCurrentUserDocument,
  Post as TPost,
  SearchDocument,
  SearchQueryVariables,
  User,
  useSearchQuery,
} from '@oasis-sh/react-gql';
import { LargeUserCard, Navbar, Post, User as UserCard } from '@oasis-sh/ui';
import { StyledMarkdown } from '@oasis-sh/parser';
import { GetServerSideProps } from 'next';
import { SEO } from '@shared/SEO';
import Link from 'next/link';

type Props = {
  vars: SearchQueryVariables;
  initialApolloState: any;
};

export const Search: React.FC<Props> = ({ vars }) => {
  const { user, currentUserLoading } = useGetCurrentUser();
  const searchResult = useSearchQuery({
    variables: vars,
  }).data?.search;
  return (
    <>
      <SEO title={`${vars.searchQuery} - Oasis Search`} />
      <Navbar
        user={user}
        currentUserLoading={currentUserLoading}
        login={login}
        logout={logout}
        defaultSearchText={vars.searchQuery}
      />
      <div className="flex flex-col justify-center w-full max-w-580 mx-auto">
        {searchResult?.map((res, idx) => (
          <div key={idx} className="w-full">
            {(() => {
              switch (res.__typename) {
                case 'Post':
                  return (
                    <Post
                      post={res as TPost}
                      markdown={(text) => (
                        <StyledMarkdown text={text} isPost={true} />
                      )}
                    />
                  );

                case 'User':
                  return (
                    <div className="bg-gray-800 rounded-2xl w-full flex flex-row justify-center">
                      <Link href={'/user/' + res.username}>
                        <LargeUserCard
                          avatar={res.avatar}
                          name={res.displayName}
                          username={res.username}
                          // user={
                          //   {
                          //     ...res,
                          //     name: res.displayName,
                          //     banner: res.userBanner,
                          //   } as any as User
                          // }
                        />
                      </Link>
                    </div>
                  );

                case 'Resort':
                  return <div>{JSON.stringify(res)}</div>;
              }
            })()}
          </div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
  req,
}) => {
  const { q: searchQuery } = query;
  const vars: SearchQueryVariables = {
    limit: 10,
    searchQuery: searchQuery as string,
  };
  return {
    props: {
      vars,
      initialApolloState: await ssrRequest(req, [
        {
          document: GetCurrentUserDocument,
        },
        {
          document: SearchDocument,
          variables: vars,
        },
      ]),
    },
  };
};

export default Search;
