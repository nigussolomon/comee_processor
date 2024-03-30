"use client";
import {
  Table,
  NativeSelect,
  Pagination,
  Button,
  Group,
  Avatar,
  Badge,
  Text,
} from "@mantine/core";
import { IconArrowsSort } from "@tabler/icons-react";
import { useState, useEffect } from "react";

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

export function DataTable({
  data = [],
  action = () => {
    alert("action");
  },
  actionText = "Action",
  noAction,
}: {
  data: Order[];
  action?: () => void;
  actionText?: string;
  noAction?: boolean;
}): JSX.Element {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [activePage, setActivePage] = useState<number>(1);
  const totalPages: number = Math.ceil(data.length / itemsPerPage);
  const startIndex: number = (activePage - 1) * itemsPerPage;
  const endIndex: number = activePage * itemsPerPage;

  const [pageData, setPageData] = useState<Order[]>(
    data.slice(startIndex, endIndex)
  );

  useEffect(() => {
    setPageData(data.slice(startIndex, endIndex));
  }, [itemsPerPage, startIndex, endIndex]);

  const handlePageChange = (newPage: number): void => {
    setActivePage(newPage);
    const startIndex: number = (newPage - 1) * itemsPerPage;
    const endIndex: number = newPage * itemsPerPage;
    setPageData(data.slice(startIndex, endIndex));
  };

  const rows: JSX.Element[] = pageData.map((item: Order) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group>
          <Avatar size="md" src={item.avatar} radius="md" />
          <div>
            <Text size="md" fw={500}>
              {item.name}
            </Text>
            <Text size="xs" color="dimmed">
              {item.email}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>{item.project_id}</Table.Td>
      <Table.Td>{item.ref_no}</Table.Td>
      <Table.Td>{item.type}</Table.Td>
      <Table.Td>
        {item.active ? (
          <Badge size="lg" color="teal">
            DONE
          </Badge>
        ) : (
          <Badge size="lg" color="blue">
            INPROGRESS
          </Badge>
        )}
      </Table.Td>
      {!noAction ? (
        <Table.Td>
          <Button
            onClick={action}
            disabled={item.active}
            variant="light"
            leftSection={<IconArrowsSort size={14} />}
          >
            {actionText}
          </Button>
        </Table.Td>
      ) : null}
    </Table.Tr>
  ));

  return (
    <>
      <Table.ScrollContainer
        minWidth="100%"
        style={{ width: "100%", border: "1px solid #e5e7eb" }}
      >
        <Table verticalSpacing="md">
          <Table.Thead>
            <Table.Tr
              style={{
                border: "5px solid #fff",
                padding: 20,
                backgroundColor: "#e5e7eb",
                color: "#191716",
              }}
            >
              <Table.Th>Order Manager</Table.Th>
              <Table.Th>Project ID</Table.Th>
              <Table.Th>REF No</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Status</Table.Th>
              {!noAction ? (
                <Table.Th style={{ width: 250 }}>Action</Table.Th>
              ) : null}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Group style={{ width: "100%", justifyContent: "flex-end" }}>
        <NativeSelect
          data={["5", "10", "20", "30", "40", "50"]}
          defaultValue="5"
          onChange={(event) => {
            const value = event.currentTarget.value;
            setItemsPerPage(Number(value));
            handlePageChange(1);
          }}
          m="sm"
          mx="0"
        />
        <Pagination
          color="#248232"
          total={totalPages}
          value={activePage}
          onChange={handlePageChange}
          m="sm"
          mx="0"
        />
      </Group>
    </>
  );
}
