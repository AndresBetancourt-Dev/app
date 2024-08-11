"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth";

export default function WithAuth(WrappedComponent: React.ComponentType) {
  const InnerComponent = (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
  return InnerComponent;
}
