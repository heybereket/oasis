import { ThumbsupIcon, ZapIcon } from '@primer/octicons-react';

export default function ActivityItem(props) {
  switch (props.event.type) {
    case 'add':
      return (
        <div className={`flex mt-2 items-center`}>
          <div
            className={`bg-gray-600 shadow-md rounded-lg w-8 h-8 flex items-center justify-center text-gray-100`}
          >
            <ZapIcon size="small" />
          </div>
          <p className={`text-sm font-mono text-gray-200 ml-2`}>
            Added{' '}
            <a
              className={`hover:text-dark-link transition duration-100`}
              href={`/r/${props.event.repo.full_name}`}
            >
              {props.event.repo.full_name}
            </a>
          </p>
        </div>
      );
    case 'like':
      return (
        <div className={`flex mt-2 items-center`}>
          <div
            className={`bg-gray-600 shadow-md rounded-lg w-8 h-8 flex items-center justify-center text-gray-100`}
          >
            <ThumbsupIcon size="small" />
          </div>
          <p className={`text-sm font-mono text-gray-200 ml-2`}>
            Liked{' '}
            <a
              className={`hover:text-dark-link transition duration-100`}
              href={`/r/${props.event.repo.full_name}`}
            >
              {props.event.repo.full_name}
            </a>
          </p>
        </div>
      );
  }
}
