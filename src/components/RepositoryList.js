import RepositoryCard from './RepositoryCard';

export default function RepositoryList({ repositories, ...etc }) {
	return (
		<div {...etc}>
			{repositories.map(repo => <RepositoryCard project={repo}/>)}
		</div>
	)
}