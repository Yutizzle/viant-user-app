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
}

export const EditUser = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-area-container">
        <NavBar />
        <EditUserArea />
      </div>
    </div>
  );
};

const EditUserArea = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedId, setSelectedId] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // get all users
    fetch('/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUsers(json);
        setRefresh(false);
      });
  }, [refresh]);

  const onSave = async () => {
    const data = {
      id: selectedId,
      username,
      email,
      firstName,
      lastName,
      password,
    };

    await fetch('/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.errorMessage) {
          setSuccessMsg(`${username} was successfully updated!`);
          setErrorMsg('');
          setRefresh(true);
        } else {
          setSuccessMsg('');
          setErrorMsg(`${json.errorMessage}`);
        }
        return;
      });
  };

  const onSelect = async (id: number) => {
    // set selected user id
    setSelectedId(id);

    // get user information from user id
    await fetch(`/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUsername(json.username);
        setEmail(json.email);
        setFirstName(json.firstName);
        setLastName(json.lastName);
        setPassword(json.password);
        return;
      });
  };

  const onCancel = () => {
    setUsername('');
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setSelectedId(0);
    setRefresh(true);
  };

  return (
    <div className="main-area">
      <div className="main-area-title">
        <h1>Edit User</h1>
      </div>
      <div className="main-area-content">
        <div className="main-area-form">
          <select onChange={(e) => onSelect(parseInt(e.target.value))}>
            <option value={0}>--</option>
            {users.map((user) =>
              user.id === selectedId ? (
                <option selected value={user.id} key={user.id}>
                  {user.username}
                </option>
              ) : (
                <option value={user.id}>{user.username}</option>
              )
            )}
          </select>
          <table>
            <tbody>
              <tr>
                <td className="form-label">
                  <label>Username:</label>
                </td>
                <td>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <td className="form-label">
                  <label>Email:</label>
                </td>
                <td>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <td className="form-label">
                  <label>First Name:</label>
                </td>
                <td>
                  <input
                    id="firstname"
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <td className="form-label">
                  <label>Last Name:</label>
                </td>
                <td>
                  <input
                    id="lastname"
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <td className="form-label">
                  <label>Password:</label>
                </td>
                <td>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="main-area-buttons">
          <div className="button-container">
            <button className="save-button" onClick={onSave}>
              Save
            </button>
          </div>
          <div className="button-container">
            <button className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="success-msg">{successMsg}</div>
      <div className="error-msg">{errorMsg}</div>
    </div>
  );
};
