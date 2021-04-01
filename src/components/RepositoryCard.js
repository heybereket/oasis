import { Link } from 'react-router-dom';

import { colours } from '../lib/constants.js';

export default function RepositoryCard({ project }) {

    const {
        url: reposUrl,
        owner: reposOwner,
        name: reposName,
        fork: reposIsFork,
        full_name: reposFullName,
        avatar: reposAvatar,
        desc: reposDescription,
        language: reposLanguage,
        issues: reposIssues,
        stars: reposStars } = project;

    return (
        <Link
            key={reposUrl}
            to={`/r/${reposFullName}`}
            rel="noreferrer"
        >
            <div className="repo">
                {reposIsFork === true && (
                    <div
                        className="fork-icon"
                        title={`${reposFullName} is a forked repository`}
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
                    alt={`${reposOwner.toLowerCase()}'s logo`}
                    className="display"
                    src={reposAvatar}
                    title={reposOwner}
                />
                <p key={reposUrl}>
                    <span className="owner">{reposOwner}</span>/
          <span className="name">{reposName}</span>
                </p>
                {reposDescription != null && <small>{reposDescription}</small>}
                {reposDescription === null && <small>No description.</small>}
                <div className="category-wrapper">
                    {reposLanguage in colours && (
                        <button className="language">
                            <svg viewBox="0 0 80 80" width="10" height="10">
                                <circle
                                    style={{ fill: colours[reposLanguage] }}
                                    className="circle"
                                    cx="40"
                                    cy="40"
                                    r="38"
                                />
                            </svg>
              &nbsp;
                            {reposLanguage}
                        </button>
                    )}
                    {!(reposLanguage in colours) && reposLanguage != null && (
                        <button className="language">
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
                            {reposLanguage}
                        </button>
                    )}
                    {reposLanguage === null && (
                        <button className="language">
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
                        </button>
                    )}
                    {reposIssues > 1000 ? (
                        <button className="issues">🚨 1k+ issues</button>
                    ) : (
                        <button className="issues">🚨 {reposIssues} issues</button>
                    )}
                    <br />
                    <button className="stars">⭐ {formatNumber(reposStars)} stars</button>
                </div>
            </div>
        </Link>
    )
}

function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}