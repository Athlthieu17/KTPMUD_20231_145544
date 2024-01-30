import { createContext, PropsWithChildren, useContext, useState } from 'react';
import Avatar from "../assets/images/avatar.png"
const AuthContext = createContext(null);

export default function AuthProvider({
  children,
  isSignedIn,
}) {
  // Uses `isSignedIn` prop to determine whether or not to render a user
  const [user] = useState(isSignedIn ? { id: 1, userName: 'khanhbatluc', image: Avatar } : null);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};