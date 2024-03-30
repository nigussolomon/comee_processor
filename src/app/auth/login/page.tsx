"use client";
import { IconMail, IconLock, IconEyeOff, IconEye } from "@tabler/icons-react";
import React from "react";
import { Group, Input, ActionIcon, Button, Text } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const fullWidth = 500;
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <main
        style={{
          padding: 20,
          backgroundColor: "#f3f4f6",
          border: "1px solid #e5e7eb",
          borderTop: "6px solid #007aff",
        }}
      >
        <Group
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
            width: fullWidth,
          }}
        >
          <Group mb={20} justify="space-between" style={{ width: "100%" }}>
            <Image
              src="/comee_logo.png"
              width={115}
              height={25}
              alt="Picture of the author"
              priority={false}
            />
            <Text size="md" fw={900}>
              PROCESSOR
            </Text>
          </Group>
          <Input
            w={fullWidth}
            size="md"
            placeholder="Email"
            rightSection={<IconMail size={20} />}
          ></Input>
          <Input
            w={fullWidth}
            size="md"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            rightSectionPointerEvents="all"
            rightSection={
              <ActionIcon
                variant="transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IconEyeOff size={20} />
                ) : (
                  <IconEye size={20} />
                )}
              </ActionIcon>
            }
          />
          <Text
            style={{ textAlign: "right", cursor: "pointer" }}
            mt={10}
            fw={600}
            w={fullWidth}
            color="#007aff"
            size="sm"
          >
            Forgot Password?
          </Text>
          <Button
            loading={loading}
            onClick={() => {
              setLoading(true);
              localStorage.setItem("isLoggedIn", "true");
              setTimeout(() => {
                router.push("/dashboard");
              }, 2000);
            }}
            size="md"
            fullWidth
          >
            LOGIN
          </Button>
        </Group>
      </main>
    </main>
  );
}
