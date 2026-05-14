'use client';

import { useEffect, useState } from 'react';

export default function EnquiryPage() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch('/api/enquiry');
    const result = await res.json();
    setData(result.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Contact Enquiries</h1>

      <table border="1" cellPadding="10" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Requirement</th>
          </tr>
        </thead>

        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.requirement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}