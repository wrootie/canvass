
import React from 'react';
import { Layout } from '../components/Layout';
import { RecordsList } from '../components/RecordsList';

const Records: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Canvassing Records</h2>
          <p className="text-gray-600">View, search, and manage all your canvassing contacts</p>
        </div>
        <RecordsList />
      </div>
    </Layout>
  );
};

export default Records;
