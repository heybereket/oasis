export default function Container(props) {
  return (
    <div {...props} className={`p-4 md:px-6 lg:px-32 ${props.className}`}>
      {props.children}
    </div>
  );
}
