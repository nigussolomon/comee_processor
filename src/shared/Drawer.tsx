"use client";
import {
  AppShell,
  Burger,
  Group,
  Skeleton,
  Avatar,
  Text,
  Drawer,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {useRouter} from "next/navigation";
import Image from "next/image";
import { Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { NavbarLinksGroup } from "./NavbarLinksGroup";

export function NavDrawer({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [opened, { toggle: open, close }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <Drawer
        position="right"
        offset={8}
        opened={opened}
        onClose={close}
        title="My Profile"
      >
        <Button color="red" onClick={()=>{
          close();
          router.push("/auth/login");          
        }}>LOGOUT</Button>
      </Drawer>
      <AppShell.Header style={{}}>
        <Group justify="space-between" h="100%" px="md">
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <Image
              src="/comee_logo.png"
              width={115}
              height={25}
              alt="Picture of the author"
              priority={false}
            />
          </Group>
          <Group onClick={open}>
            <Group
              gap={0}
              style={{
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <Text color="#05184C">Hi, I'm Maveko</Text>
              <Text size="xs" color="dimmed">
                Order Manager
              </Text>
            </Group>
            <Avatar
              radius="sm"
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              alt="it's me"
            />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <NavbarLinksGroup />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
