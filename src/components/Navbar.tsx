import { auth } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";
import { LogOutIcon } from "lucide-react";
import { Login } from "./Login";
import { Share } from "./Share";
import { Button } from "./ui/button";

const Navbar = () => {
  const { isAuthenticated, isPending } = useAuth();

  return (
    <nav className="flex justify-between items-center p-2">
      {isPending && <div>Loading...</div>}
      {isAuthenticated && <div>Welcome {auth.currentUser?.email}</div>}
      {!isAuthenticated && <div>Welcome Guest</div>}
      <div className="flex gap-2">
        {!isAuthenticated && <Login />}

        {isAuthenticated && (
          <Button onClick={() => auth.signOut()}>
            <LogOutIcon className="w-4 h-4" />
            Logout
          </Button>
        )}
        <Share />
      </div>
    </nav>
  );
};

export default Navbar;
