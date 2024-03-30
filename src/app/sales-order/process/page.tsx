"use client";
import { DataTable } from "@/shared/table";
import {
  Drawer,
  TextInput,
  Textarea,
  Group,
  Text,
  NativeSelect,
  Button,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

export default function Process() {
  const [opened, { toggle: open, close }] = useDisclosure(false);
  const [templateType, setTemplateType] = useState<string>("PAEmail");
  const [from, setFrom] = useState<string>("ordermanager@maveko.com");
  const [to, setTo] = useState<string>();
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<string>();

  interface Order {
    avatar: string;
    name: string;
    email: string;
    project_id: string;
    ref_no: string;
    type: string;
    active: boolean;
    qty: number;
  }

  const OrderData: Order[] = [
    {
      avatar:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
      name: "John Doe",
      email: "john.doe@gmail.com",
      project_id: "1002TREW",
      ref_no: "SO124ERW",
      qty: 100,
      type: "PA",
      active: false,
    },
    {
      avatar:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
      name: "Jane Smith",
      email: "jane.smith@gmail.com",
      project_id: "1003TREW",
      ref_no: "SO125ERW",
      qty: 100,
      type: "STREmail",
      active: false,
    },
    {
      avatar:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png",
      name: "Bob Johnson",
      email: "bob.johnson@gmail.com",
      project_id: "1004TREW",
      ref_no: "SO126ERW",
      qty: 100,
      type: "SDEmail",
      active: false,
    },
    {
      avatar:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png",
      name: "Anna Black",
      email: "anna.black@gmail.com",
      project_id: "1005TREW",
      ref_no: "SO127ERW",
      qty: 100,
      type: "PA",
      active: false,
    },
    {
      avatar:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
      name: "Harry Brown",
      email: "harry.brown@gmail.com",
      project_id: "1006TREW",
      ref_no: "SO128ERW",
      qty: 100,
      type: "STREmail",
      active: false,
    },
    {
      avatar:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
      name: "Emma Taylor",
      email: "emma.taylor@gmail.com",
      project_id: "1007TREW",
      ref_no: "SO129ERW",
      qty: 100,
      type: "SDEmail",
      active: false,
    },
    {
      avatar:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
      name: "Olivia Davis",
      email: "olivia.davis@gmail.com",
      project_id: "1008TREW",
      ref_no: "SO130ERW",
      qty: 100,
      type: "PA",
      active: false,
    },
    {
      avatar:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png",
      name: "Noah Taylor",
      email: "noah.taylor@gmail.com",
      project_id: "1009TREW",
      ref_no: "SO131ERW",
      qty: 100,
      type: "STREmail",
      active: false,
    },
    {
      avatar:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
      name: "Mason Patel",
      email: "mason.patel@gmail.com",
      project_id: "1010TREW",
      ref_no: "SO132ERW",
      qty: 100,
      type: "SDEmail",
      active: false,
    },
  ];

  const sendEmail = async (): Promise<void> => {
    if (from && to && subject && body) {
      const response = await fetch(
        "https://comee-projects.onrender.com/send_email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: {
              from: from,
              to: to,
              subject: subject,
              body: body,
            },
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        await close();
        await setTo("");
        notifications.show({
          title: "Email Sent",
          message: "Email has been sent successfully",
          color: "green",
          autoClose: 5000,
        });
      } else {
        console.log(data);
        notifications.show({
          title: "Error",
          message: "An error occurred while sending the email",
          color: "red",
          autoClose: 5000,
        });
      }
    } else {
      notifications.show({
        title: "Error",
        message: "Please fill in all the fields",
        color: "red",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <Drawer
        size="xl"
        position="right"
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        title="Send Email"
      >
        <TextInput
          label="Email To"
          description="Enter the recipient contact for the fulfiment center"
          size="md"
          mt="md"
          placeholder="manual@entry.com"
          onChange={(e) => setTo(e.currentTarget.value)}
          inputWrapperOrder={["label", "error", "input", "description"]}
        />

        <TextInput
          size="md"
          mt="md"
          label="Email Subject"
          onChange={(e) => {
            setSubject(e.currentTarget.value);
          }}
          value={subject}
          placeholder="fulfilmencenter@maveko.com"
          description="Subject of the email to be sent to the contact"
          inputWrapperOrder={["label", "error", "input", "description"]}
        />

        <Textarea
          size="md"
          mt="md"
          radius="xs"
          onChange={(e) => {
            setBody(e.currentTarget.value);
          }}
          value={body}
          rows={5}
          label="Email Body"
          placeholder="Input placeholder"
          description="Body of the email to be sent to the contact"
          inputWrapperOrder={["label", "error", "input", "description"]}
        />

        <Group
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            color="red"
            onClick={close}
            variant="outline"
            mt="lg"
            size="md"
          >
            Cancel
          </Button>
          <Button onClick={sendEmail} mt="lg" size="md">
            Send Email
          </Button>
        </Group>
      </Drawer>
      <Text size="lg" style={{ fontSize: "24px" }} fw={900}>
        Process Order
      </Text>
      <Divider my="sm"></Divider>
      <DataTable
        data={OrderData}
        action={() => {
          open();
        }}
        actionText="Notify"
      ></DataTable>
    </>
  );
}
