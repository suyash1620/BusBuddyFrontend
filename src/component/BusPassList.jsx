import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const BusPassList = () => {
  const [busPasses, setBusPasses] = useState([]);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserEmail(user.email);
    }
    fetchBusPasses();
  }, []);

  const fetchBusPasses = async () => {
    try {
      const response = await axios.get('http://localhost:1620/busPass');
      setBusPasses(response.data);
    } catch (error) {
      console.error('Error fetching bus passes:', error);
    }
  };

  const handleBusPassClick = (id) => {
    navigate(`/busPass/${id}`);
  };

  
  const userBusPasses = busPasses.filter(pass => pass.email === userEmail);

  return (
    <div className='auth-wrapper'>
      <div className='auth-inner'>
        <h2 className='title'>My Bus Pass</h2>
        <ul className='bus-pass-list'>
          {userBusPasses.map(pass => {
            const isExpired = new Date(pass.expiryDate) < new Date();

            return (
              <li key={pass._id} className='bus-pass-item'>
                <div className='bus-pass-info'>
                  <p>Name: {pass.name}</p>
                  <p>Email: {pass.email}</p>
                  <p>Pass Type: {pass.passType}</p>
                  <p>Issue Date: {new Date(pass.issueDate).toLocaleDateString()}</p>
                  <p>Expiry Date: {new Date(pass.expiryDate).toLocaleDateString()}</p>
                  {isExpired ? (
                    <>
                      <p className='expired-message'>This QR code is invalid and cannot be scanned</p>
                      <QRCode value={JSON.stringify(pass)} size={150} fgColor="red" /><br />
                      <button className='renew-button' onClick={() => handleBusPassClick(pass._id)}>Renew Pass</button>
                    </>
                  ) : (<>
                    <QRCode value={JSON.stringify(pass)} size={150} /><br />
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BusPassList;

