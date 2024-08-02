import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const result = await axios.post('/api/bfhl', parsedInput);
            setResponse(result.data);
        } catch (error) {
            alert('Invalid JSON or request failed');
        }
    };

    const handleSelect = (e) => {
        const { options } = e.target;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setSelectedOptions(selected);
    };

    return (
        <div>
            <h1>{/* Your roll number */}</h1>
            <input 
                type="text" 
                value={jsonInput} 
                onChange={(e) => setJsonInput(e.target.value)} 
                placeholder='Enter JSON'
            />
            <button onClick={handleSubmit}>Submit</button>

            {response && (
                <div>
                    <select multiple={true} onChange={handleSelect}>
                        <option value="numbers">Numbers</option>
                        <option value="alphabets">Alphabets</option>
                        <option value="highest_alphabet">Highest Alphabet</option>
                    </select>
                    <div>
                        {selectedOptions.includes('numbers') && (
                            <div>Numbers: {response.numbers.join(', ')}</div>
                        )}
                        {selectedOptions.includes('alphabets') && (
                            <div>Alphabets: {response.alphabets.join(', ')}</div>
                        )}
                        {selectedOptions.includes('highest_alphabet') && (
                            <div>Highest Alphabet: {response.highest_alphabet.join(', ')}</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
