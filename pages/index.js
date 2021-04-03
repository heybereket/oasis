import Navbar from "../components/Navbar";
import Homepage from "../modules/homepage";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <Navbar />
      <Homepage />
    </div>
  );
}
