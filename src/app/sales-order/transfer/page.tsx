"use client";
import { DataTable } from "@/shared/table";
import { DataTableMini } from "@/shared/tableMini";
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

export default function Transfer() {
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
    setTimeout(() => {
      notifications.show({
        title: "Transfer Sent",
        message: "Transfer Request has been sent successfully",
        color: "green",
        autoClose: 5000,
      });
      close();
    }, 1000);
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
        title="Transfer Request"
      >
        <Group grow>
          <NativeSelect
            size="md"
            label="From"
            defaultValue=""
            data={["Warehouse 1", "Warehouse 2", "Warehouse 3", "Warehouse 4"]}
            onChange={(event) => setFrom(event.currentTarget.value)}
          ></NativeSelect>
          <NativeSelect
            size="md"
            label="To"
            value={to}
            defaultValue=""
            data={["Warehouse 1", "Warehouse 2", "Warehouse 3", "Warehouse 4"]}
            onChange={(event) => setTo(event.currentTarget.value)}
          ></NativeSelect>
        </Group>
        <Divider my="sm"></Divider>
        <Group>
          <DataTableMini data={OrderData} actionText="ADD"></DataTableMini>
        </Group>
        <Divider my="sm"></Divider>
        <Group justify="flex-end">
          <Button onClick={sendEmail}>Send Transfer Request</Button>
        </Group>
      </Drawer>
      <Text size="lg" style={{ fontSize: "24px" }} fw={900}>
        Transfer Order
      </Text>
      <Divider my="sm"></Divider>
      <DataTable
        data={OrderData}
        action={() => {
          open();
        }}
        actionText="Transfer Request"
      ></DataTable>
    </>
  );
}
