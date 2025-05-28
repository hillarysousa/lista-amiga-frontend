import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../firebase-config";

const redirectToGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth!, provider);
};

export { redirectToGoogle };
