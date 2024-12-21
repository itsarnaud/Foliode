import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";

export default function SignOutButton({ isOpen }: { isOpen: boolean }) {
  const router = useRouter();

  const handleSignOut = () => {
    document.cookie = "token_auth=; max-age=0; path=/;";
    router.push("/login");
  };

  return (
    <button 
      onClick={handleSignOut}
      className={`nightMode flex items-center gap-3 py-2 px-3 my-3 rounded-lg cursor-pointer duration-200 text-[#B0B5BB] hover:text-white justify-center ${isOpen ? 'lg:justify-start' : ''}`}
    >
      <span className="text-xl"><MdLogout /></span>
      <span className={`hidden ${isOpen ? 'lg:block' : ''}`}>Se déconnecter</span>
    </button>
  );
}