"use client";
import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";

import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconChevronRight,
} from "@tabler/icons-react";
import classes from "./NavbarLinksGroup.module.css";
import { useRouter, usePathname } from "next/navigation";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
}: LinksGroupProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text
      style={{
        backgroundColor: pathname === link.link ? "#3b82f625" : "",
      }}
      className={classes.link}
      key={link.label}
      onClick={(event) => {
        event.preventDefault();
        router.push(link.link);
      }}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        style={{
          backgroundColor: pathname === link ? "#3b82f625" : "transparent",
        }}
        onClick={() => {setOpened((o) => !o), !hasLinks && router.push(link)}}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" color="#3b82f6" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const routes = [
  { label: "Dashboard", icon: IconGauge, link: "/dashboard" },
  {
    label: "Sales Order",
    icon: IconNotes,
    link: "/sales-order",
    links: [
      { label: "Process Order", link: "/sales-order/process" },
      { label: "Transfer Request", link: "/sales-order/transfer" },
      { label: "Order Status", link: "/sales-order/status" },
    ],
  },
  {
    label: "Email Templates",
    icon: IconCalendarStats,
    link: "/email-templates",
  },
  { label: "Task Configurations", icon: IconAdjustments, link: "/task-configurations" },
];

export function NavbarLinksGroup() {
  const links = routes.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Box mih={220} p={0}>
      {links}
    </Box>
  );
}
