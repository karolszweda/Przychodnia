import Navbar from './components/Navbar';
import Container from './components/Container';
import SignIn from './components/SignIn';

export default function App(){
  return (
    <div>
      <Navbar />
      <div className="section">
        <SignIn />
      </div>      
    </div>
  );
}

