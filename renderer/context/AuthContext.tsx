// AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextProps {
  user: any;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      return new Promise((resolve, reject) => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          resolve(JSON.parse(storedUser));
        } else {
          resolve(null);
        }
      });
    };

    const fetchData = async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSetUser = (user: any) => {
    setUser(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};
