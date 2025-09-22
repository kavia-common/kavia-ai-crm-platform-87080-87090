import React from 'react';
import Card from '../components/ui/Card';

const Accounts = () => {
  const mock = [
    { id: 1, name: 'Acme Inc.', domain: 'acme.com', owner: 'Jane' },
    { id: 2, name: 'Globex', domain: 'globex.com', owner: 'Wade' },
  ];

  return (
    <Card title="Accounts">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th><th>Domain</th><th>Owner</th><th></th>
          </tr>
        </thead>
        <tbody>
          {mock.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.domain}</td>
              <td>{a.owner}</td>
              <td><button className="button">Open</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Accounts;
