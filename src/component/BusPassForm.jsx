import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import RazorpayButton from './RazorpayButton';
import { useNavigate } from 'react-router-dom';

const BusPassForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passType, setPassType] = useState('1 month');
  const [price, setPrice] = useState(50); // Initialize with the price for '1 month'
  const [busPass, setBusPass] = useState(null);
  const [isPassValid, setIsPassValid] = useState(true);

  const priceMap = {
    '1 month': 50,
    '3 months': 135,
    '6 months': 250,
    '1 year': 480,
  };

const gotobusspass = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  useEffect(() => {
    if (busPass) {
      const currentDate = new Date();
      const expiryDate = new Date(busPass.expiryDate);
      setIsPassValid(currentDate <= expiryDate);
    }
  }, [busPass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Payment will be handled in RazorpayButton component
  };

  const handlePaymentSuccess = async (paymentId) => {
    try {
      if (localStorage.getItem("token")) {
        const response = await axios.post('http://localhost:1620/addbusPass', {
          name,
          email,
          passType,
          paymentId,
        });
        setBusPass(response.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error('Error creating bus pass:', error);
    }
  };

  const handlePassTypeChange = (e) => {
    const selectedPassType = e.target.value;
    setPassType(selectedPassType);
    setPrice(priceMap[selectedPassType]); // Update price based on selected pass type
  };

  return (
    <div>
      <h2>Create Bus Pass</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Select Your Pass Validity:
          <select value={passType} onChange={handlePassTypeChange}>
            <option value="1 month">1 Month</option>
            <option value="3 months">3 Months</option>
            <option value="6 months">6 Months</option>
            <option value="1 year">1 Year</option>
          </select>
        </label>
        <p>Price= Rs:{price}</p> {/* Display the price */}
        {!busPass && <RazorpayButton onPaymentSuccess={handlePaymentSuccess} />}
      </form>

      {busPass && (
        <div>
          <h3>Bus Pass {isPassValid ? 'Created' : 'Expired'}</h3>
          <p>Name: {busPass.name}</p>
          <p>Email: {busPass.email}</p>
          <p>Pass Type: {busPass.passType}</p>
          <p>Expiry Date: {new Date(busPass.expiryDate).toLocaleDateString()}</p>
          {isPassValid ? (
            <QRCode value={JSON.stringify(busPass)} />
          ) : (
            <p style={{ color: 'red' }}>This bus pass is invalid.</p>
          )}
        </div>
      )}
      <button onClick={()=>gotobusspass('/list')}>click</button>
      
    </div>
  );
};

export default BusPassForm;
