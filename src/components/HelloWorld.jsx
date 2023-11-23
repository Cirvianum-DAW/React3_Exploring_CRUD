import React from 'react';

function HelloWorld() {
  const handleClick = () => {
    alert('Hello World!');
  };
  return (
    <div className="App">
      <button onClick={handleClick}>React</button>
    </div>
  );
}

export default HelloWorld;
