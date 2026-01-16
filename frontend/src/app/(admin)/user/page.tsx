'use client';
import { JSX, useState } from 'react';
import DataTable from '@/components/data-table/data-table';
import { HeadCellItem } from '@/components/data-table/type';

export default function DashboardPage(): JSX.Element {
  const data = [
    { id: 1, name: 'Apple MacBook Pro 17', price: 2999, category: 'Laptop' },
    { id: 2, name: 'Microsoft Surface Pro', price: 1999, category: 'Laptop PC' },
    { id: 3, name: 'Magic Mouse 2', price: 99, category: 'Accessories' },
    { id: 4, name: 'Apple Watch', price: 199, category: 'Watches' },
    { id: 5, name: 'Apple iMac', price: 2999, category: 'Desktop' },
    { id: 6, name: 'AirPods Max', price: 549, category: 'Headphones' },
    { id: 7, name: 'iPad Air', price: 599, category: 'Tablet' },
    { id: 8, name: 'HomePod Mini', price: 99, category: 'Smart Home' },
  ];
  const dataTableHeader: HeadCellItem[] = [
    { label: 'Id', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Price', key: 'price' },
    { label: 'Category', key: 'category' },
    {
      label: 'Action', key: 'action', sortable: false, render: ({ item }: { item: any }) => {
        return <label>{item.id}</label>;
      },
    },
  ];
  return <DataTable data={data} defaultSortKey={'id'} identifyKey={'id'} perPageTotal={3} header={dataTableHeader} />;
  // // Double check permission inside the page content
  // const canDelete = true
  // return (
  //   <div className="space-y-6">
  //     <div className="flex items-center justify-between">
  //       <h1 className="text-2xl font-bold">User Management</h1>
  //       <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
  //         Add User
  //       </button>
  //     </div>
  //
  //     <div className="rounded-lg border bg-white shadow-sm">
  //       <table className="w-full text-left text-sm">
  //         <thead className="bg-gray-50 text-gray-500">
  //         <tr>
  //           <th className="px-6 py-3 font-medium">Name</th>
  //           <th className="px-6 py-3 font-medium">Role</th>
  //           <th className="px-6 py-3 font-medium">Status</th>
  //           <th className="px-6 py-3 font-medium text-right">Actions</th>
  //         </tr>
  //         </thead>
  //         <tbody className="divide-y divide-gray-100">
  //         {/* Mock Row */}
  //         <tr className="hover:bg-gray-50">
  //           <td className="px-6 py-4 font-medium">John Doe</td>
  //           <td className="px-6 py-4">Editor</td>
  //           <td className="px-6 py-4 text-green-600">Active</td>
  //           <td className="px-6 py-4 text-right">
  //             <button className="text-blue-600 hover:underline mr-3">Edit</button>
  //
  //             {/* 🔒 CONDITIONAL RENDER: Only Admins see delete */}
  //             {canDelete && (
  //               <button className="text-red-600 hover:underline">Delete</button>
  //             )}
  //           </td>
  //         </tr>
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
}