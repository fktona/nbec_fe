"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { verifyToken } from "../actions/auth";

type Admin = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type AdminContextType = {
  admin: Admin | null;
  setAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const AdminData = await verifyToken();
      console.log(AdminData);
      if (AdminData) {
        setAdmin(AdminData);
      }
    };
    checkAuth();
  }, []);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within a AdminProvider");
  }
  return context;
};
