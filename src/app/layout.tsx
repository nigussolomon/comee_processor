"use client";
import React, { useState, useEffect } from "react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { ColorSchemeScript, MantineProvider, Skeleton } from "@mantine/core";
import { NavDrawer } from "@/shared/Drawer";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Notifications } from "@mantine/notifications";

export type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // useEffect(() => {
  //   setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  // }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/mavekoLogo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Maveko - COMee</title>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <AuthProvider>
            <AuthCheck router={router} pathname={pathname}>
              {children}
            </AuthCheck>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

type AuthCheckProps = {
  children: React.ReactNode;
  router: any;
  pathname: string;
};

function AuthCheck({ children, router, pathname }: AuthCheckProps) {
  const { isLoggedIn } = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn && !pathname.startsWith("/auth")) {
      setIsLoading(false);
      router.push("/auth/login");
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, pathname, router]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Image src="/comee_logo.png" alt="Comee Logo" width={300} height={70} />
      </div>
    );
  } else {
    return (
      <>
        {isLoggedIn && !pathname.startsWith("/auth") ? (
          <NavDrawer>
            <>
              <Notifications />
              {children}
            </>
          </NavDrawer>
        ) : (
          children
        )}
      </>
    );
  }
}
