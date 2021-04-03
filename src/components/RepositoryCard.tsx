import { FC } from 'react';
import { Link } from 'react-router-dom';

import { colours } from '../lib/constants';
import { formatNumber } from '../utils/numbers';
import { Button } from '../components/common/Buttons';

interface IRepositoryCardProps {
    project: {
        language: string;
        url: any;
        owner: any;
        name: any;
        fork: any;
        full_name: any;
        avatar: any;
        desc: any;
        issues: any;
        stars: any;
    };
}

const RepositoryCard: FC<IRepositoryCardProps> = ({ project: {language, url, owner, name, fork, full_name, avatar, desc, issues, stars} }) => {

    return (
        <Link
            key={url}
            to={`/r/${full_name}`}
            rel="noreferrer"
        >
            <div className="repo">
                {fork === true && (
                    <div
                        className="fork-icon"
                        title={`${full_name} is a forked repository`}
                    >
                        <svg
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="20"
                            height="20"
                            aria-hidden="true"
                            fill="white"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            ></path>
                        </svg>
                    </div>
                )}
                <img
                    alt={`${owner.toLowerCase()}'s logo`}
                    className="display"
                    src={avatar}
                    title={owner}
                />
                <p key={url}>
                    <span className="owner">{owner}</span>/
          <span className="name">{name}</span>
                </p>
                {desc !== null && <small>{desc}</small>}
                {desc === null && <small>No description.</small>}
                <div className="category-wrapper">
                    {language in colours && (
                        <Button>
                            <svg viewBox="0 0 80 80" width="10" height="10">
                                <circle
                                    style={{ fill: colours[language] }}
                                    className="circle"
                                    cx="40"
                                    cy="40"
                                    r="38"
                                />
                            </svg>

                            &nbsp;
                            {language}
                        </Button>
                    )}
                    {!(language in colours) && language !== null && (
                        <Button>
                            <svg viewBox="0 0 80 80" width="10" height="10">
                                <circle
                                    style={{ fill: '#fff' }}
                                    className="circle"
                                    cx="40"
                                    cy="40"
                                    r="38"
                                />
                            </svg>
              &nbsp;
                            {language}
                        </Button>
                    )}
                    {language === null && (
                        <Button>
                            <svg viewBox="0 0 80 80" width="10" height="10">
                                <circle
                                    style={{ fill: '#fff' }}
                                    className="circle"
                                    cx="40"
                                    cy="40"
                                    r="38"
                                />
                            </svg>
              &nbsp; N/A
                        </Button>
                    )}
                    {issues > 1000 ? (
                        <Button>🚨 1k+ issues</Button>
                    ) : (
                        <Button>🚨 {issues} issues</Button>
                    )}
                    <br />
                    <Button>⭐ {formatNumber(stars)} stars</Button>
                </div>
            </div>
        </Link>
    )
};

export default RepositoryCard;