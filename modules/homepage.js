export default function Homepage() {
  return (
    <div className={`w-screen h-screen flex flex-col items-center justify-center`}>
      <img src="/static/logo.svg" className={`w-16 mb-4`}></img>
      <a
        href={'/demo'}
        className={` rounded-3xl px-4 py-2 bg-red-600 text-white font-semibold hover:bg-red-400 transition duration-200`}
      >
        Goto API Demos
      </a>
    </div>
  );
}
