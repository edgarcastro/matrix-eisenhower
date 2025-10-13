import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { LogInIcon } from "lucide-react";
import { formatFirebaseAuthError } from "@/utils";

export const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <LogInIcon className="w-4 h-4" />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isSignUp ? (
          <SignUpForm setIsSignUp={setIsSignUp} />
        ) : (
          <LoginForm setIsSignUp={setIsSignUp} />
        )}
      </DialogContent>
    </Dialog>
  );
};

const LoginForm = ({
  setIsSignUp,
}: {
  setIsSignUp: (isSignUp: boolean) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(formatFirebaseAuthError(error));
      } else {
        setErrorMessage("Error logging in");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>Login to your account here.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 pt-4">
        <div className="grid gap-3">
          <Label htmlFor="email-1">Email</Label>
          <Input
            id="email-1"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password-1">Password</Label>
          <Input
            id="password-1"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
      </div>
      <div className="flex pb-2 pt-2 flex-start">
        <Button
          className="text-left pl-0"
          type="button"
          variant="link"
          onClick={() => setIsSignUp(true)}
        >
          Don't have an account? Sign up here.
        </Button>
      </div>
      <DialogFooter>
        <div className="flex-1">
          {errorMessage && (
            <span className="text-red-500 text-xs">{errorMessage}</span>
          )}
        </div>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={!email || !password || isLoading}>
          {isLoading ? <Spinner className="w-4 h-4" /> : "Login"}
        </Button>
      </DialogFooter>
    </form>
  );
};

const SignUpForm = ({
  setIsSignUp,
}: {
  setIsSignUp: (isSignUp: boolean) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordMatch = password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSignUp(email, password);
  };

  const handleSignUp = async (email: string, password: string) => {
    setIsLoading(true);
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(formatFirebaseAuthError(error));
      } else {
        setErrorMessage("Error signing up");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogDescription>Create an account here.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 pt-4">
        <div className="grid gap-3">
          <Label htmlFor="email-1">Email</Label>
          <Input
            id="email-1"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password-1">Password</Label>
          <Input
            id="password-1"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password-1">Confirm Password</Label>
          <Input
            id="confirm-password-1"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            required
          />
        </div>
      </div>
      <div className="flex pb-2 pt-2 flex-start">
        <Button
          className="text-left pl-0"
          type="button"
          variant="link"
          onClick={() => setIsSignUp(false)}
        >
          Have an account? Login here.
        </Button>
      </div>
      <DialogFooter>
        <div className="flex-1">
          {errorMessage && (
            <span className="text-red-500 text-xs">{errorMessage}</span>
          )}
        </div>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          disabled={!passwordMatch || !email || !password || !confirmPassword}
        >
          {isLoading ? <Spinner className="w-4 h-4" /> : "Sign Up"}
        </Button>
      </DialogFooter>
    </form>
  );
};
