import React, { useState } from 'react';
import EmailSubscriptionComponent from './emailsubscriptioncomponent';
import CodeValidationComponent from './codevalidation';
import './subscriptionmanager.css'

const SubscriptionManager = ({ onLoginSuccess }) => {
    const [popupStage, setPopupStage] = useState('email'); // Initial stage
    const [userEmail, setUserEmail] = useState('');
   

    const handleSubscriptionSuccess = (email) => {
        setPopupStage('code');
        setUserEmail(email);
    };

    const handleCodeValidationSuccess = () => {
        onLoginSuccess();
    };

    const handleGoBack = () => {
        setPopupStage('email');
        setUserEmail('');
    };


    
    return (
        <div>
            {popupStage === 'email' && (
                <EmailSubscriptionComponent onSubscriptionSuccess={handleSubscriptionSuccess} />
            )}
            {popupStage === 'code' && (
                <CodeValidationComponent 
                    email={userEmail} 
                    onCodeValidationSuccess={handleCodeValidationSuccess} 
                    onGoBack={handleGoBack} 
                />
            )}
         
        </div>
    );
};

export default SubscriptionManager;

/*SubscriptionManager:

Manages the state (popupStage) to switch between email subscription, code validation, and logged-in stages.
Passes necessary handlers and state to the child components. 



: Manages the stages between email subscription and code validation, and handles transitions and states
*/
