import * as Wrapper from '../../../utils/apiWrapper';
import Navbar from '../../../components/Navbar';
import Container from '../../../components/Container';
import { MarkGithubIcon, LinkIcon } from '@primer/octicons-react';
import ReactMarkdownWithHTML from 'react-markdown/with-html';
import gfm from 'remark-gfm';

export default function User(props) {
  var { data, error } = Wrapper.SWR('auth');

  return (
    <div className="flex flex-col min-h-screen bg-dark-tertiary">
      <Navbar swrAuth={data} swrError={error} />
      <Container className={`md:mt-4 flex-col`}>
        <div className={`flex flex-col md:flex-row`}>
          <div className={`flex flex-col md:w-6/12 lg:w-8/12`}>
            <div
              className={`px-4 py-5 shadow-xl bg-dark-lighter rounded-3xl flex flex-col md:flex-row md:items-center row-span-2 `}
            >
              <div className={`flex flex-col mx-4 `}>
                <h1 className={`text-gray-100 flex text-2xl leading-7 md:text-3xl font-bold mb-1`}>
                  {props.repo.full_name}
                </h1>
                {props.repo.desc ? (
                  <h1 className={`text-gray-200 text-xs md:text-sm font-mono mb-0.5`}>
                    {props.repo.desc}
                  </h1>
                ) : null}

                <h1 className={`text-gray-500 text-xs font-mono`}>
                  Added by{' '}
                  <a
                    href={`/u/${props.repo.added_by.username}`}
                    className={`text-gray-400 hover:text-dark-link transition duration-100`}
                  >
                    {props.repo.added_by.name
                      ? props.repo.added_by.name
                      : `@${props.repo.added_by.username}`}
                  </a>
                </h1>

                <div className={`flex mt-2 text-gray-300 items-center`}>
                  <a
                    href={`https://github.com/${props.repo.full_name}`}
                    target="_blank"
                    rel="noopener"
                  >
                    <MarkGithubIcon
                      className={`color-current hover:text-white w-5 h-5 transition duration-100 mr-2`}
                    />
                  </a>

                  {props.repo.link && (
                    <a href={`${props.repo.link}`} target="_blank" rel="noopener">
                      <LinkIcon
                        className={`color-current hover:text-white w-5 h-5 transition duration-100`}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`mt-2 md:mt-4 px-4 py-5 shadow-xl bg-dark-lighter rounded-3xl flex flex-col md:flex-row md:items-center col-span-12 md:col-span-8`}
            >
              <div className={`text-dark-text`}>
                <ReactMarkdownWithHTML
                  allowDangerousHtml
                  plugins={[gfm]}
                  children={props.repo.markdown}
                />
              </div>
            </div>
          </div>
          <div
            className={`mt-2 md:mt-0 md:ml-4 flex-grow px-4 py-5 shadow-xl bg-dark-lighter rounded-3xl flex flex-col md:flex-row md:items-center col-span-12 md:col-span-4 `}
          >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps(context) {
  const repoName = `${context.params.owner}/${context.params.repo}`;
  var repo = await Wrapper.repo(repoName);
  repo.added_by = await Wrapper.user(repo.added_by);

  var readme_data = await Wrapper.FetchJSON(`https://api.github.com/repos/${repoName}/readme`);
  repo.markdown = await Wrapper.Fetch(readme_data.download_url);

  return { props: { repo }, revalidate: 60 };
}

export async function getStaticPaths() {
  var repos = await Wrapper.repos('max');
  const paths = repos.map(item => {
    var repoNames = item.full_name.split('/');
    return {
      params: { owner: repoNames[0], repo: repoNames[1] },
    };
  });

  return { paths, fallback: false };
}
