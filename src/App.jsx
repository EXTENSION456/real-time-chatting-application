import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function App() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-12 gap-6">
      {/* Text Section */}
      <div className="text-center lg:text-center space-y-6 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          <span className="text-blue-500">Slang</span>
          <span className="text-gray-500">Zone</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          A real-time messaging experience, built for speed and simplicity —
          like WhatsApp, but yours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-center">
          <Button
            className="px-6 py-3 text-base cursor-pointer"
            onClick={handleClick}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            className="px-6 py-3 text-base cursor-pointer"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full max-w-2xl mx-auto mt-8 lg:mt-0">
        <img
          src="/chat.svg"
          alt="Chat Illustration"
          className="w-full max-h-[400px] object-contain"
        />
      </div>
    </div>
  );
}
