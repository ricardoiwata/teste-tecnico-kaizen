import { createContext, useContext, useEffect, useState } from "react";

type AuthCtx = {
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx>({} as AuthCtx);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  async function login(_email: string, _password: string) {
    return false;
  }

  async function register(_name: string, _email: string, _password: string) {
    return false;
  }

  function logout() {
    setToken(null);
  }

  return (
    <Ctx.Provider value={{ token, login, register, logout }}>
      {children}
    </Ctx.Provider>
  );
}
