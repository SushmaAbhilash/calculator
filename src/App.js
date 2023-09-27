 
import { evaluate } from 'mathjs';
import './App.css';
import { useState } from 'react';



function App() {

  const[displays,setDisplays] = useState('0')

  const numbers = [
    {
      id: "zero",
      text: '0'
    },
    {
      id: "one",
      text:'1'
    },
    {
      id: "two",
      text: '2'
    },
    {
      id: "three",
      text: '3'
    },
    {
      id: "four",
      text: '4'
    },
    {
      id: "five",
      text: '5'
    },
    {
      id: "six",
      text: '6'
    },
    {
      id: "seven",
      text: '7'
    },
    {
      id: "eight",
      text: '8'
    },
    {
      id: "nine",
      text: '9'
    },
   
  ]
  const operators = [
    {
      id: 'add',
      text: "+"
    },
    {
      id: 'subtract',
      text: "-"
    },
    {
      id: 'multiply',
      text: "*"
    },
    {
      id: 'divide',
      text: "/"
    },
  ]


  const display = (select) => {
    if (displays === '0' || displays === 0) {
      setDisplays(select);
    } else {
      setDisplays(prevDisplays => prevDisplays + select);
    }
    
  }
  const operates = (selector) => {
    let trimmedDisplay = displays.trim();
    const lastChar = trimmedDisplay.slice(-1);

    // If the last character is an operator and the new selector is not `-`, replace the last operator.
    if (['+', '*', '/'].includes(lastChar) && selector !== '-') {
        trimmedDisplay = trimmedDisplay.slice(0, -1);
    }

    setDisplays(trimmedDisplay + ' ' + selector + ' ');
}

  

const handleEqual = () => {
  try {
      // Process the sequence
      let processedInput = processSequence(displays);
      
      const result = evaluate(processedInput);
      setDisplays(result.toString());
  } catch (e) {
      setDisplays("Error");
  }
}

// Helper function to process the sequence
const processSequence = (sequence) => {
  // Replace consecutive operators with the last operator; but if the last is `-`, use the one before it.
  let result = sequence.replace(/[-+*/]\s[-+*/]+\s/g, (match) => {
      const operators = match.trim().split(' ');
      if (operators[operators.length - 1] === '-') {
          return ' ' + operators[operators.length - 2] + ' ';
      }
      return ' ' + operators[operators.length - 1] + ' ';
  });

  return result;
}

  
  const handleDecimal =() => {
  const array = displays.split(/[-+*/]/);
    const lastElement = array[array.length - 1];

    if(!lastElement.includes('.')){
        setDisplays(displays + '.');
    }
  }

  const handleAc = () => {
    setDisplays('0');
  }

  return (
    <div className="App">
      <div id="calc">
      <input id="display" type='text' value={displays} readOnly />

     <div className='numbers' >
     {numbers.map((number) => <div id={number.id} key = {number.id} className='num' onClick={() => {display(number.text)}}>{number.text}</div>)}
     
     <div id="equals" onClick={handleEqual}>=</div>
     <div id="decimal" onClick={handleDecimal}>.</div>
     <div id="clear" onClick={handleAc}>AC</div>
     </div>

     <div className='opera'>
      {operators.map((operator) => <div id={operator.id} key={operator.id} className='ope' onClick={() => {operates(operator.text)}}>{operator.text}</div>)}
     </div>
     
     
     </div>
    </div>
  );
}

export default App;
