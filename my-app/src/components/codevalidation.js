import React, { useState } from 'react';

const CodeValidationComponent = ({ email, onCodeValidationSuccess, onGoBack }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleValidateCode = async () => {
        try {
            const response = await fetch('/validate-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });
            const result = await response.json();
            if (result.valid) {
                onCodeValidationSuccess();
            } else {
                setError('Invalid code. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
                placeholder="Enter the code sent to your email" 
            />
            <button onClick={handleValidateCode}>Validate Code</button>
            {error && <p>{error}</p>}
            <button onClick={onGoBack}>Go Back</button>
        </div>
    );
};

export default CodeValidationComponent;

/*CodeValidationComponent:

Handles the code input and validation process.
Displays an error message if the code is invalid or an error occurs.
Provides a "Go Back" button to return to the email subscription stage. 

Handles the code validation logic and displays errors or success messages accordingly.
*/