// ChargesDetails.js

import React from 'react';
import './Styles/charges-details.css'; 

const ChargesDetails = () => {
  return (
    <div className="charges-details-container">
    <h3>Bike Service App Charges Details:</h3>
      <p>
        Charges for bike service are subject to change based on the type of work required and the specific bike model.
        The cost may vary from bike to bike.
      </p>
      <p>
        General Service: The standard cost for a general bike service is approximately 800rs.
      </p>
      <p>
        Please note that the final charges will be determined after a thorough assessment of the bike's condition and the scope of work needed to ensure a comprehensive service.
      </p>
      <p>
        For a more accurate estimation of the charges, we recommend using our app's booking feature to schedule a service appointment. Our experienced technicians will inspect your bike and provide you with a detailed breakdown of the service charges tailored to your bike's needs.
      </p>
      <p>
        Thank you for choosing our Bike Service App. We look forward to providing you with top-notch service and keeping your bike in excellent condition. If you have any further questions or require assistance, feel free to reach out to our support team.
      </p>
      <p>Ride safe!</p>
    </div>
  );
};

export default ChargesDetails;
