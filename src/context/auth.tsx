import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { auth } from "@/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "@/store/reducers/auth";
import { RootState } from "@/store";
import { useRouter } from "next/router";

export interface AuthContextValues {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValues>({
  user: null,
  login: (email: string, password: string) => {},
  register: (email: string, password: string) => {},
  logout: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        router.push("/tasks");
      } else {
        dispatch(clearUser());
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error("Error al iniciar sesión");
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error("Error al registrarse");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error("Error al cerrar sesión");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
