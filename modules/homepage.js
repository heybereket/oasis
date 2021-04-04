import Navbar from "../components/Navbar";
export default function Homepage() {
  return (
    <div className={`w-screen h-screen flex items-center justify-center`}>
      <button
        className={`shadow rounded-3xl px-4 py-2 bg-black text-white font-semibold hover:bg-white hover:text-black transition duration-200`}
      >
        Modern Button
      </button>
    </div>
  );
}
