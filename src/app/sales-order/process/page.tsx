"use client";
import { DataTable } from "../../../components/table";
import { OrderData } from "../../../data/tableData";
import {
  Drawer,
  TextInput,
  Textarea,
  Group,
  Text,
  NativeSelect,
  Button,
  Divider
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
      <Text size="lg" style={{ fontSize: "24px" }} fw={900} >Process Order</Text>
      <Divider my="sm"></Divider>
      <DataTable data={OrderData} action={()=> {open()}} actionText="Notify"></DataTable>
    </>
  );
}
