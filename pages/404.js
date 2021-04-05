export default function Custom404() {
  return (
    <div className={`w-screen h-screen m-0 flex flex-col items-center justify-center`}>
      <div
        className={`z-50 w-10/12 h-64 md:w-6/12 lg:w-4/12 flex flex-col items-center justify-center px-4 text-center`}
      >
        <h1 className={`text-xl`}>
          Dammit stranger, <br></br>You got lost in the <b>404</b> galaxy.
        </h1>
        <a
          href="/"
          className={`rounded-md border-2 border-black mt-4 px-4 py-2 transition duration-200 hover:bg-black hover:text-white`}
        >
          home / repos <span className={`mx-1`}>🎉</span>
        </a>
      </div>
    </div>
  );
}
