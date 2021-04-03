export default function Home() {
  return (
    <div
      className={`flex flex-col items-center justify-center w-screen h-screen`}
    >
      <h1>Oasis Template</h1>
      <a
        href="/demo"
        className={`my-2 px-4 py-2 bg-black rounded-xl text-white`}
      >
        Go to Login Demo
      </a>
    </div>
  );
}
