interface TopicBadgeProps {
  content: string;
}

export const TopicBadge: React.FC<TopicBadgeProps> = (props) => {
  return (
    <div className="rounded-full bg-gray-600 px-4 py-1 inline-block mb-2 mr-1">
      {props.content}
    </div>
  );
};
