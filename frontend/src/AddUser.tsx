import { useState } from 'react';
import { Header } from './Header';
import { NavBar } from './NavBar';

export const AddUser = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-area-container">
        <NavBar />
        <AddUserArea />
      </div>
    </div>
  );
};

const AddUserArea = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onSave = async () => {
    const data = {
      username,
      email,
      firstName,
      lastName,
      password,
    };

    await fetch('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.errorMessage) {
          setSuccessMsg(`${username} was successfully added!`);
          setErrorMsg('');
        } else {
          setSuccessMsg('');
          setErrorMsg(`${json.errorMessage}`);
        }
        return;
      });
  };

  const onCancel = () => {
    setUsername('');
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
  };

  return (
    <div className="main-area">
      <div className="main-area-title">
        <h1>Add User</h1>
      </div>
      <div className="main-area-content">
        <div className="main-area-form">
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
