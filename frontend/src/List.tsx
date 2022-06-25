import { useEffect, useState } from 'react';
import { Header } from './Header';
import { NavBar } from './NavBar';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  lastUpdated: string;
}

interface SortConfig {
  key: string;
  order: string;
}

export const List = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-area-container">
        <NavBar />
        <MainArea />
      </div>
    </div>
  );
};

const MainArea = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sortConfig, setSortConfig] = useState({ key: '', order: 'asc' });

  useEffect(() => {
    fetch('/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUsers(json);
      });
  }, []);

  const sortTable = (key: string) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return prev.order === 'asc' ? { ...prev, order: 'desc' } : { ...prev, order: 'asc' };
      } else {
        return { key, order: 'asc' };
      }
    });
  };

  useEffect(() => {
    let sortedData = [...users];
    const key = sortConfig.key;

    sortedData.sort((a, b) => {
      if (
        a[key as keyof User].toString().toLowerCase() <
        b[key as keyof User].toString().toLowerCase()
      ) {
        return sortConfig.order === 'asc' ? -1 : 1;
      }
      if (
        a[key as keyof User].toString().toLowerCase() >
        b[key as keyof User].toString().toLowerCase()
      ) {
        return sortConfig.order === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedData);
  }, [sortConfig.key, sortConfig.order]);

  return (
    <div className="main-area">
      <div className="main-area-title">
        <h1>User List</h1>
      </div>
      <div className="main-area-content">
        <table className="user-list">
          <thead>
            <th>
              <button className="table-header-button" onClick={() => sortTable('id')}>
                ID
              </button>
              <span>
                {sortConfig.key === 'id' && sortConfig.order !== '' ? sortConfig.order : ''}
              </span>
            </th>
            <th>
              <button className="table-header-button" onClick={() => sortTable('username')}>
                Username
              </button>
              <span>
                {sortConfig.key === 'username' && sortConfig.order !== '' ? sortConfig.order : ''}
              </span>
            </th>
            <th>
              <button className="table-header-button" onClick={() => sortTable('email')}>
                Email
              </button>
              <span>
                {sortConfig.key === 'email' && sortConfig.order !== '' ? sortConfig.order : ''}
              </span>
            </th>
            <th>
              <button className="table-header-button" onClick={() => sortTable('firstName')}>
                First Name
              </button>
              <span>
                {sortConfig.key === 'firstName' && sortConfig.order !== '' ? sortConfig.order : ''}
              </span>
            </th>
            <th>
              <button className="table-header-button" onClick={() => sortTable('lastName')}>
                Last Name
              </button>
              <span>
                {sortConfig.key === 'lastName' && sortConfig.order !== '' ? sortConfig.order : ''}
              </span>
            </th>
            <th>
              <button className="table-header-button" onClick={() => sortTable('lastUpdated')}>
                Last Updated
              </button>
              <span>
                {sortConfig.key === 'lastUpdated' && sortConfig.order !== ''
                  ? sortConfig.order
                  : ''}
              </span>
            </th>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{new Date(user.lastUpdated).toISOString().substring(0, 10)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
