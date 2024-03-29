'use client';
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Drawer } from "@/shared/Drawer";
import { useRouter, usePathname } from "next/navigation";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/mavekoLogo.png" type="image/x-icon" />
        <title>Maveko - COMee</title>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          {pathname.startsWith("/auth/") ? (
            <>{children}</>
          ) : (
            <Drawer>
              <>
                <Notifications />
                {children}
              </>
            </Drawer>
          )}
        </MantineProvider>
      </body>
    </html>
  );
}
