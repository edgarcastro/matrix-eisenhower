import { FirebaseError } from "firebase/app";

export const formatFirebaseAuthError = (error: FirebaseError): string => {
  switch (error.code) {
    case "auth/claims-too-large":
      return "The claims payload is too large. The maximum size is 1000 bytes.";
    case "auth/email-already-exists":
      return "This email is already in use by another account.";
    case "auth/id-token-expired":
      return "Your session has expired. Please sign in again.";
    case "auth/id-token-revoked":
      return "Your session has been revoked. Please sign in again.";
    case "auth/insufficient-permission":
      return "Insufficient permissions to perform this operation.";
    case "auth/internal-error":
      return "An internal error occurred. Please try again later.";
    case "auth/invalid-argument":
      return "Invalid argument provided.";
    case "auth/invalid-claims":
      return "Invalid custom claims attributes provided.";
    case "auth/invalid-continue-uri":
      return "The continue URL must be a valid URL string.";
    case "auth/invalid-creation-time":
      return "Invalid creation time provided.";
    case "auth/invalid-credential":
      return "Invalid credentials. Please check your email and password.";
    case "auth/invalid-disabled-field":
      return "Invalid value for the disabled user property.";
    case "auth/invalid-display-name":
      return "Invalid display name. It must be a non-empty string.";
    case "auth/invalid-dynamic-link-domain":
      return "The provided dynamic link domain is not configured or authorized.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/invalid-email-verified":
      return "Invalid value for email verified field.";
    case "auth/invalid-hash-algorithm":
      return "Invalid hash algorithm.";
    case "auth/invalid-hash-block-size":
      return "Invalid hash block size.";
    case "auth/invalid-hash-derived-key-length":
      return "Invalid hash derived key length.";
    case "auth/invalid-hash-key":
      return "Invalid hash key.";
    case "auth/invalid-hash-memory-cost":
      return "Invalid hash memory cost.";
    case "auth/invalid-hash-parallelization":
      return "Invalid hash parallelization.";
    case "auth/invalid-hash-rounds":
      return "Invalid hash rounds.";
    case "auth/invalid-hash-salt-separator":
      return "Invalid hash salt separator.";
    case "auth/invalid-id-token":
      return "Invalid ID token.";
    case "auth/invalid-last-sign-in-time":
      return "Invalid last sign-in time.";
    case "auth/invalid-page-token":
      return "Invalid page token.";
    case "auth/invalid-password":
      return "Invalid password. It must be at least 6 characters.";
    case "auth/invalid-password-hash":
      return "Invalid password hash.";
    case "auth/invalid-password-salt":
      return "Invalid password salt.";
    case "auth/invalid-phone-number":
      return "Invalid phone number. Please use E.164 format.";
    case "auth/invalid-photo-url":
      return "Invalid photo URL. It must be a valid URL string.";
    case "auth/invalid-provider-data":
      return "Invalid provider data.";
    case "auth/invalid-provider-id":
      return "Invalid provider ID.";
    case "auth/invalid-oauth-responsetype":
      return "Only exactly one OAuth responseType should be set to true.";
    case "auth/invalid-session-cookie-duration":
      return "Invalid session cookie duration.";
    case "auth/invalid-uid":
      return "Invalid user ID. It must be a non-empty string with at most 128 characters.";
    case "auth/invalid-user-import":
      return "The user record to import is invalid.";
    case "auth/maximum-user-count-exceeded":
      return "The maximum allowed number of users to import has been exceeded.";
    case "auth/missing-android-pkg-name":
      return "An Android Package Name must be provided.";
    case "auth/missing-continue-uri":
      return "A valid continue URL must be provided in the request.";
    case "auth/missing-hash-algorithm":
      return "Missing hash algorithm.";
    case "auth/missing-ios-bundle-id":
      return "The request is missing a Bundle ID.";
    case "auth/missing-uid":
      return "A user ID is required for the current operation.";
    case "auth/missing-oauth-client-secret":
      return "The OAuth configuration client secret is required.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled. Please enable it in the Firebase console.";
    case "auth/phone-number-already-exists":
      return "This phone number is already in use by another account.";
    case "auth/project-not-found":
      return "No Firebase project was found.";
    case "auth/reserved-claims":
      return "One or more custom user claims are reserved.";
    case "auth/session-cookie-expired":
      return "Your session has expired. Please sign in again.";
    case "auth/session-cookie-revoked":
      return "Your session has been revoked. Please sign in again.";
    case "auth/too-many-requests":
      return "Too many requests. Please try again later.";
    case "auth/uid-already-exists":
      return "This user ID is already in use by another account.";
    case "auth/unauthorized-continue-uri":
      return "The domain of the continue URL is not whitelisted.";
    case "auth/user-disabled":
      return "This account has been disabled by an administrator.";
    case "auth/user-not-found":
      return "No user found with these credentials.";
    case "auth/weak-password":
      return "Password is too weak. Please use a stronger password.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed before completing the sign-in.";
    case "auth/cancelled-popup-request":
      return "Another popup is already open.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email but different sign-in credentials.";
    default:
      return error.message || "An unexpected error occurred. Please try again.";
  }
};
