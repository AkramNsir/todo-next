"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const { isSignedIn } = useUser();
  // const { signOut } = useClerk();
  return (
    <nav className="border-b h-[8vh] flex items-center">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-3xl">LOGO</h1>
        </Link>
      </div>

      <div className="flex items-center gap-x-5">
        {isSignedIn ? (
          <>
            {/* <button className="w-[100px] bg-gray-200 p-2 rounded-md text-center">
              <SignOutButton />
            </button> */}
            <UserButton />
          </>
        ) : (
          <div className="flex items-center gap-x-5">
            <Link href="/sign-in">
              <button className="w-[100px] bg-gray-200 p-2 rounded-md text-center">
                Sign in
              </button>
            </Link>

            <Link href="/sign-up">
              <button className="w-[100px] bg-gray-200 p-2 rounded-md text-center">
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;