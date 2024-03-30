"use client";
import { Table, NativeSelect, Pagination, Button, Group, Avatar, Badge, Text, TextInput } from "@mantine/core";
import {IconArrowsSort} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { Order } from "../interfaces/order";

export function DataTableMini({ data = [], action = () => {alert("action")}, actionText="Save" }: { data: Order[], action?: () => void, actionText?: string }): JSX.Element {
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
      <Table.Td>{item.project_id}</Table.Td>
      <Table.Td>{item.ref_no}</Table.Td>
      <Table.Td>{item.qty}</Table.Td>
      <Table.Td style={{ width: 120 }}>
        <TextInput/>
      </Table.Td>
      <Table.Td>
        <Button
          disabled={item.active}
          variant="light"
          leftSection={<IconArrowsSort size={14} />}
        >
          {actionText}
        </Button>
      </Table.Td>
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
              <Table.Th>Project ID</Table.Th>
              <Table.Th>REF No</Table.Th>
              <Table.Th>Order Qty</Table.Th>
              <Table.Th>Request Qty</Table.Th>
              <Table.Th style={{ width: 80 }}>Action</Table.Th>
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
