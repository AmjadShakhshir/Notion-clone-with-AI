import TypewriterTitle from "@/components/ui/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-r grainy min-h-screen from-rose-100 to-teal-100 flex flex-wrap justify-center">
      <div className="w-full lg:w-1/3 flex items-center justify-center">
        <Image
          src="https://img.freepik.com/free-vector/blue-lined-notepaper-sticker-vector_53876-174277.jpg?t=st=1715805914~exp=1715809514~hmac=6ac0fb7e7da39db4b2c5aa26af8d76b96fba8d0220e5b44089547a09b3c75e5e&w=826"
          width={400}
          height={400}
          alt="logo"
          className="rounded-full p-3 border-2 mx-auto"
        />
      </div>
      <div className="w-full lg:w-1/3 flex flex-col f items-center justify-center">
        <h1 className="text-7xl font-semibold text-center">
          Meet your <span className="text-cyan-600 font-bold">Notely </span>
          with AI.
        </h1>
        <div className="mt-4"></div>
        <h2 className="text-3xl lg:text-3xl font-semibold text-center text-slate-700">
          <TypewriterTitle />
        </h2>
        <div className="mt-8"></div>

        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button className="bg-cyan-600">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
