import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import RazorpayButton from './RazorpayButton';

const BusPassDetail = () => {
  const { id } = useParams();
  const [busPass, setBusPass] = useState(null);
  const [passType, setPassType] = useState('1 month');
const gotobusspass = useNavigate()
  const fetchBusPass = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:1620/busPass/${id}`);
      setBusPass(response.data);
    } catch (error) {
      console.error('Error fetching bus pass:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchBusPass();
  }, [fetchBusPass]);

  const handleRenew = async (paymentId) => {
    try {
      const response = await axios.put(`http://localhost:1620/renewbusPass/${busPass._id}`, {
        passType,
        paymentId,
      });
      setBusPass(response.data);
    } catch (error) {
      console.error('Error renewing bus pass:', error);
    }
  };

  if (!busPass) return <p>Loading...</p>;

  const getPassAmount = (passType) => {
    switch (passType) {
      case '1 month':
        return 100;
      case '3 months':
        return 250;
      case '6 months':
        return 450;
      case '1 year':
        return 800;
      default:
        return 0;
    }
  };

  return (
    <div>
      <h2>Bus Pass Details</h2>
      <p>Name: {busPass.name}</p>
      <p>Email: {busPass.email}</p>
      <p>Pass Type: {busPass.passType}</p>
      <p>Expiry Date: {new Date(busPass.expiryDate).toLocaleDateString()}</p>
    
       Renew pass : <select value={passType} onChange={(e) => setPassType(e.target.value)}>
        <option value="1 month">1 Month</option>
        <option value="3 months">3 Months</option>
        <option value="6 months">6 Months</option>
        <option value="1 year">1 Year</option>
      </select>
     
      <RazorpayButton onPaymentSuccess={handleRenew} amount={getPassAmount(passType)} />
<br></br><br></br>

      <QRCode value={JSON.stringify(busPass)} />
      <button onClick={()=>gotobusspass('/list')}>click</button>
    </div>
  );
};

export default BusPassDetail;

