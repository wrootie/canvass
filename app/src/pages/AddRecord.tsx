
import React from 'react';
import { Layout } from '../components/Layout';
import { AddRecordForm } from '../components/AddRecordForm';

const AddRecord: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New Contact</h2>
          <p className="text-gray-600">Record information about someone you spoke with while canvassing</p>
        </div>
        <AddRecordForm />
      </div>
    </Layout>
  );
};

export default AddRecord;
