import './App.css';
import { useState } from 'react';


export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
      <AboutPage />
      <Person />
      <ShoppingList />
    </div>
  );
}


function MyButton() {
  const [count, setCount] = useState(0);
  function handleClick() {
    alert('You clicked me!');
    setCount(count + 1); 
  }

  return (
    <button onClick={handleClick}>
      Clicked me {count} times
    </button>
  );
}

function AboutPage() {
  return (
    <div className='granica'>
      <h1>About Page</h1>
      <p>This is the about page</p>
    </div>
  );
}

const user = {
  name: 'John',
  age: 25
};

function Person() {
  return (
    <div>
      <h1>Person</h1>
      <p>This is {user.name} the person page</p>
    </div>
  );
}


const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}


