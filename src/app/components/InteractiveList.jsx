"use client"; 

import React, { useState, useEffect, useRef, useCallback } from 'react'



const initialItems = [
    { id: 'apple', type: 'Fruit', name: 'Apple' },
    { id: 'broccoli', type: 'Vegetable', name: 'Broccoli' },
    { id: 'mushroom', type: 'Vegetable', name: 'Mushroom' },
    { id: 'banana', type: 'Fruit', name: 'Banana' },
    { id: 'tomato', type: 'Vegetable', name: 'Tomato' },
    { id: 'orange', type: 'Fruit', name: 'Orange' },
    { id: 'mango', type: 'Fruit', name: 'Mango' },
    { id: 'pineapple', type: 'Fruit', name: 'Pineapple' },
    { id: 'cucumber', type: 'Vegetable', name: 'Cucumber' },
    { id: 'watermelon', type: 'Fruit', name: 'Watermelon' },
    { id: 'carrot', type: 'Vegetable', name: 'Carrot' },
  ];

  const ITEM_RETURN_DELAY = 5000;

  function InteractiveList() {
    const [mainList, setMainList] = useState(initialItems);
    const [fruitList, setFruitList] = useState([]);
    const [vegetableList, setVegetableList] = useState([]);
  
   
    const itemTimersRef = useRef({});
  
   
   
    const returnItemToMainList = useCallback((itemToReturn) => {
      // Clear any existing timer for this item
      if (itemTimersRef.current[itemToReturn.id]) {
        clearTimeout(itemTimersRef.current[itemToReturn.id]);
        delete itemTimersRef.current[itemToReturn.id]; // Clean up the ref
      }
  
      // Remove from the current column list
      if (itemToReturn.type === 'Fruit') {
        setFruitList((prev) => prev.filter((item) => item.id !== itemToReturn.id));
      } else {
        setVegetableList((prev) => prev.filter((item) => item.id !== itemToReturn.id));
      }
  
      // Add back to the main list
      setMainList((prev) => [...prev, itemToReturn]);
    }, []);
  
  
    // --- Function to move an item from the main list to a column ---
    const moveItemToColumn = (itemToMove) => {
    
      setMainList((prev) => prev.filter((item) => item.id !== itemToMove.id));
  
     
      if (itemToMove.type === 'Fruit') {
        setFruitList((prev) => [...prev, itemToMove]);
      } else {
        setVegetableList((prev) => [...prev, itemToMove]);
      }
  
     
      const timerId = setTimeout(() => {
        returnItemToMainList(itemToMove);
      }, ITEM_RETURN_DELAY);
  
      
      itemTimersRef.current[itemToMove.id] = timerId;
    };
  
  
  
    useEffect(() => {
      return () => {
        console.log("Cleaning up timers...");
        Object.values(itemTimersRef.current).forEach(clearTimeout);
      };
    }, []); 
   


    const columnStyle = {
      border: '1px solid #ccc',
      padding: '15px',
      margin: '10px',
      minHeight: '200px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px', 
      borderRadius: '20px',
    };
  
    const buttonStyle = {
      padding: '8px 12px',
      cursor: 'pointer',
      border: '1px solid #ddd',
      borderRadius: '10px',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      transition: 'background-color 0.2s ease', 
    };
  
    const hoverStyle = `:hover { background-color: #e0e0e0; }`; 
  
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      
        <div style={{ ...columnStyle, borderColor: 'grey' }}>
          {mainList.length === 0 && <p><i>No items left.</i></p>}
          {mainList.map((item) => (
            <button
              key={item.id}
              onClick={() => moveItemToColumn(item)}
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'} 
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}  
            >
              {item.name}
            </button>
          ))}
        </div>
  
       
        <div style={{ ...columnStyle, borderColor: 'lightcoral' }}>
          <h2 className='text-center  text-red-500 font-semibold'>Fruits</h2>
         
          {fruitList.map((item) => (
            <button
              key={item.id}
              onClick={() => returnItemToMainList(item)} 
              style={{ ...buttonStyle, backgroundColor: '#ffe0e0' }} 
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffd0d0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffe0e0'}
            >
              {item.name}
            </button>
          ))}
        </div>
  
       
        <div style={{ ...columnStyle, borderColor: 'lightgreen' }}>
          <h2 className='text-center text-green-500 font-semibold'>Vegetables</h2>
         
          {vegetableList.map((item) => (
            <button
              key={item.id}
              onClick={() => returnItemToMainList(item)} 
              style={{ ...buttonStyle, backgroundColor: '#e0ffe0' }} 
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d0ffd0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e0ffe0'}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

export default InteractiveList