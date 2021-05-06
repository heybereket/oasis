export const Container: React.FC = (props) => {
  return <div className={`lg:max-w-lg mx-auto`}>{props.children}</div>;
};
