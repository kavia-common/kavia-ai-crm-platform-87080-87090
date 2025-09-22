import React from 'react';
import Card from '../components/ui/Card';

const Accounts = () => {
  // Updated accounts aligned with pipeline companies and current team members
  const mock = [
    { id: 501, name: 'Tata Elxsi', domain: 'tataelxsi.com', owner: 'Alex' },
    { id: 902, name: 'ioet', domain: 'ioet.com', owner: 'Jamie' },
    { id: 301, name: 'GCS Tech', domain: 'gcstech.com', owner: 'Priya' },
    { id: 602, name: 'DigitalT3', domain: 'digitalt3.com', owner: 'Jamie' },
    { id: 701, name: 'MetaZ digital', domain: 'metaz.digital', owner: 'Priya' },
  ];

  return (
    <Card title="Accounts">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th><th>Domain</th><th>Owner</th><th>Open Deals</th><th></th>
          </tr>
        </thead>
        <tbody>
          {mock.map(a => {
            // lightweight static open deal counts by account name based on current pipeline mock
            const openDealsByAccount = {
              'Tata Elxsi': 1,
              'ioet': 0, // has a closed won deal in pipeline example; qualification item here counts as open in Deals page list
              'GCS Tech': 2,
              'DigitalT3': 1,
              'MetaZ digital': 1,
            };
            const openCount = openDealsByAccount[a.name] ?? 0;
            return (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.domain}</td>
                <td>{a.owner}</td>
                <td>{openCount}</td>
                <td><button className="button">Open</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default Accounts;
