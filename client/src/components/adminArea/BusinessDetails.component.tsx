import React, { useEffect, useState } from 'react';
import Axios from '../../services/axios';
// import './BusinessDetails.css';

interface Business {
  id: string;
  name: string;
  address: string;
  contactMethods: string[];
}

const BusinessDetails: React.FC = () => {
  const [business, setBusiness] = useState<Business | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await Axios.get('/api/businesses/your-business-id'); // Replace with the actual business ID or logic to get it
        setBusiness(response.data);
      } catch (error) {
        console.error('Error fetching business details:', error);
      }
    };

    fetchBusiness();
  }, []);

  if (!business) {
    return <div>Loading...</div>;
  }

  return (
    <div className="business-details">
      <h2>פרטי עסק</h2>
      <p>שם העסק: {business.name}</p>
      <p>כתובת: {business.address}</p>
      <h3>דרכי התקשרות</h3>
      {/* <ul>
        {business.contactMethods.map((contact, index) => (
          <li key={index}>{contact}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default BusinessDetails;
