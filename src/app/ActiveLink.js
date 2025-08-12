import Link from "next/link";
import { useRouter } from "next/router";

export default function ActiveLink({ href, children }) {
  const { pathname } = useRouter();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg ${
        isActive
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
    >
      {children}
    </Link>
  );
}
