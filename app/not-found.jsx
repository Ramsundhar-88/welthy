import Link from "next/link";


export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black text-center px-4">
      <h1 className="text-7xl font-extrabold mb-4 animate-bounce">404 💸</h1>
      <p className="text-xl mb-2">Looks like your money isn’t the only thing missing...</p>
      <p className="text-md text-gray-400 mb-8">This page is bankrupt and doesn’t exist!</p>
      
      <Link 
        href="/" 
        className="px-6 py-3 bg-green-600 rounded-lg shadow-md hover:bg-green-500 transition font-semibold"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}