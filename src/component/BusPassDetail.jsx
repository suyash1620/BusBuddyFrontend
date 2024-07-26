import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import RazorpayButton from './RazorpayButton';

const BusPassDetail = () => {
  const { id } = useParams();
  const [busPass, setBusPass] = useState(null);
  const [passType, setPassType] = useState('1 month');
  const navigate = useNavigate();

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

  const isExpired = new Date(busPass.expiryDate) < new Date();

  return (
    <div className='auth-wrapper' style={{ height: "650px" }}>
      <div className='auth-inner' style={{ height: "600px" }}>
        <h2 style={{ color: "white" }}>Bus Pass Details</h2>
        <p style={{ color: "white" }}>Name: {busPass.name}</p>
        <p style={{ color: "white" }}>Email: {busPass.email}</p>
        <p style={{ color: "white" }}>Pass Type: {busPass.passType}</p>
        <p style={{ color: "white" }}>Expiry Date: {new Date(busPass.expiryDate).toLocaleDateString()}</p>

        {isExpired ? (
          <>
            <span style={{ color: "white" }}>Renew pass here</span>:
            <select
              value={passType}
              onChange={(e) => setPassType(e.target.value)}
              style={{ marginLeft: "30px", width: "120px", height: "25px", outline: "none", borderRadius: "5px", textAlign: "center" }}
            >
              <option value="1 month">1 Month</option>
              <option value="3 months">3 Months</option>
              <option value="6 months">6 Months</option>
              <option value="1 year">1 Year</option>
            </select>
            <span style={{ marginLeft: "-30px" }}>
              <RazorpayButton onPaymentSuccess={handleRenew} amount={getPassAmount(passType)} />
            </span>
          </>
        ) : (
          <p style={{ color: "white" }}>Your pass is valid.</p>
        )}

        <br /><br />
        <QRCode value={JSON.stringify(busPass)} /><br />
        <button onClick={() => navigate('/list')}>Go to pass</button>
      </div>
    </div>
  );
};

export default BusPassDetail;
