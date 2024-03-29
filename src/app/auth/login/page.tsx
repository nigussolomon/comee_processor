"use client";
import React from "react";
import {
  Container,
  Text,
  Divider,
  TextInput,
  Group,
  Button,
} from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Group
        style={{
          flexDirection: "column",
          width: "600px",
          backgroundColor: "#f3f4f6",
          borderTop: "5px solid #05184c",
        }}
        p={"lg"}
        gap={"sm"}
      >
        <Group w={"100%"} justify="space-between">
          <Text
            style={{
              fontSize: "1.5rem",
            }}
            color="#05184c"
            size="xl"
            fw={900}
          >
            Login
          </Text>
          <Image
            src="/comee_logo.png"
            width={115}
            height={25}
            alt="Picture of the author"
            priority={false}
          />
        </Group>
        <Divider my="xs" />
        <TextInput
          w={"100%"}
          label="Email"
          placeholder="username@maveko.com"
          size="md"
          withAsterisk
        />
        <TextInput
          type={showPassword ? "text" : "password"}
          w={"100%"}
          label="Password"
          placeholder="*******"
          size="md"
          withAsterisk
        />
        <Text
          style={{ width: "100%", cursor: "pointer", textAlign: "right" }}
          mt="sm"
        >
          Forgot Password?
        </Text>
        <Button
          loading={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              router.push("/home");
            }, 1000);
          }}
          size="lg"
          fullWidth
        >
          Login
        </Button>
      </Group>
    </div>
  );
}
