import React from 'react';
import CustomerSelect from './customerSelect';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Bill From Goel Enterprises</h1>
          <select className="bg-white text-gray-800 rounded p-1">
            <option value="cash-sale">Cash Sale</option>
          </select>
        </div>
      </header>
      <main className="flex-grow p-4">
        <div className="flex items-center mb-4">
          <div className="w-64 mr-4">
            <CustomerSelect/>
          </div>
          <div className="text-lg font-bold">Bill of Supply Ⓡ</div>
        </div>
      </main>
    </div>
  );
}