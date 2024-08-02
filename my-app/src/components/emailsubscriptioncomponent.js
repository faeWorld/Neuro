import React, { useState } from 'react';
import axios from 'axios';

const EmailSubscriptionComponent = ({ onSubscriptionSuccess }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubscribe = async () => {
        try {
            const response = await axios.post('/subscribe', { email });
            if (response.data === 'Subscription successful! Please check your email for the code.') {
                setMessage(response.data);
                onSubscriptionSuccess(email);
            } else {
                setMessage('Subscription failed. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
            />
            <button onClick={handleSubscribe}>Subscribe</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EmailSubscriptionComponent;

/*EmailSubscriptionComponent:

Handles the email input and subscription process.
Displays a success message and triggers onSubscriptionSuccess with the email if the subscription is successful.

Handles the email subscription logic and displays the appropriate message
*/