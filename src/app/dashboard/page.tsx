"use client";
import {
  Progress,
  Card,
  Group,
  Avatar,
  Badge,
  Table,
  Text,
  Switch,
  Divider,
  NativeSelect,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

interface Employee {
  avatar: string;
  name: string;
  job: string;
  email: string;
  role: string;
  totalTrainings: number;
  lastActive: string;
  active: boolean;
  year: number;
}

export default function Home(): JSX.Element {
  const itemsPerPage: number = 7;
  const [activePage, setActivePage] = useState<number>(1);
  const [opened, { toggle, close }] = useDisclosure(false);

  const data: Employee[] = [
    {
      avatar:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
      name: "Robert Wolfkisser",
      job: "Engineer",
      email: "rob_wolf@gmail.com",
      role: "Collaborator",
      totalTrainings: 100,
      lastActive: "2 days ago",
      active: true,
      year: 1254121,
    },

    {
      avatar:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
      name: "Sarah Hefner",
      job: "Engineer",
      email: "sarah_hef@gmail.com",
      role: "Collaborator",
      totalTrainings: 100,
      lastActive: "2 days ago",
      active: true,
      year: 202212345,
    },
    // Other employees omitted for brevity
  ];

  const totalPages: number = Math.ceil(data.length / itemsPerPage);

  const startIndex: number = (activePage - 1) * itemsPerPage;
  const endIndex: number = activePage * itemsPerPage;
  const [pageData, setPageData] = useState<Employee[]>(
    data.slice(startIndex, endIndex)
  );

  const handlePageChange = (newPage: number): void => {
    setActivePage(newPage);
    const startIndex: number = (newPage - 1) * itemsPerPage;
    const endIndex: number = newPage * itemsPerPage;
    setPageData(data.slice(startIndex, endIndex));
  };

  const rows: JSX.Element[] = pageData.map((item: Employee) => (
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

      <Table.Td>{item.year}</Table.Td>
      <Table.Td>{item.year}</Table.Td>
      <Table.Td>{item.role}</Table.Td>
      <Table.Td>{item.totalTrainings}</Table.Td>
      <Table.Td>
        {item.active ? (
          <Badge size="md" color="teal">
            Active
          </Badge>
        ) : (
          <Badge size="md" color="red">
            Inactive
          </Badge>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Text
        style={{
          fontSize: 30,
        }}
        mb="md"
        size="xl"
        fw={500}
      >
        Dashboard
      </Text>
      <Group align="stretch" grow>
        <Card
          padding="xl"
          style={{ width: 515, height: 160 }}
          radius="md"
          shadow="sm"
        >
          <Text size="xs" fw={700} color="dimmed">
            Projects In-Progress
          </Text>
          <Text size="lg" fw={500}>
            10 / 30
          </Text>
          <Progress value={33.3} mt="md" radius="xl" />
        </Card>

        <Card
          padding="xl"
          style={{ width: 515, height: 160 }}
          radius="md"
          shadow="sm"
        >
          <Text size="xs" fw={700} color="dimmed">
            Completed Projects
          </Text>
          <Text size="lg" fw={480}>
            5 / 30
          </Text>
          <Progress
            color="green"
            value={33.3 / 2}
            mt="md"
            size="lg"
            radius="xl"
          />
        </Card>
      </Group>
      <Divider mt="xl"></Divider>
      <Group
        style={{
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Divider mt="xl"></Divider>
        <Text
          style={{
            fontSize: 30,
          }}
          mb="md"
          size="xl"
          fw={500}
        >
          Recently Added Projects
        </Text>

        <Group
          style={{
            width: "100%",
          }}
        >
          <Table.ScrollContainer minWidth="100%" style={{ width: "100%" }}>
            <Table verticalSpacing="md">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Project Manager</Table.Th>
                  <Table.Th>Project ID</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Folder</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Group>
      </Group>
    </div>
  );
}
