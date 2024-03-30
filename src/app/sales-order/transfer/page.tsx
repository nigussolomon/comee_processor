"use client";
import { DataTable } from "@/components/table";
import { DataTableMini } from "@/components/tableMini";
import { OrderData } from "@/data/tableData";
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
          <DataTableMini
            data={OrderData}
            actionText="ADD"
          ></DataTableMini>
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
