import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { request } from "../api/client";

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
  const nav = useNavigate();

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  async function login(email: string, password: string) {
    const res = await request<{ token: string }>(
      api.post("/auth/login", { email, password })
    );
    if (res.ok && res.data.token) {
      setToken(res.data.token);
      return true;
    }
    return false;
  }

  async function register(name: string, email: string, password: string) {
    const res = await request(
      api.post("/auth/register", { name, email, password })
    );
    return res.ok;
  }

  function logout() {
    setToken(null);
    nav("/login");
  }

  return (
    <Ctx.Provider value={{ token, login, register, logout }}>
      {children}
    </Ctx.Provider>
  );
}
