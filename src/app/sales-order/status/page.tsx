'use client';
import {DataTable} from "@/components/table"
import {OrderData} from "@/data/tableData"
export default function Status() {
  return <><DataTable data={OrderData} noAction></DataTable></>;
}
