import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Features from './components/Features';
import NavBar from './components/NavBar';
import Story from './components/Story';
import Pin from './components/Pin';
import Contact from './components/Contact';
import Footer from './components/Footer';

export const MainContainer = '.main-container';
function App() {
  return (
    <div>
    <NavBar/>
    <div className='main-container overflow-hidden'>
      <Hero />
      <AboutUs />
      <Features />
      <Story />
      <Pin />
      <Contact />
      <Footer />
    </div>
    </div>
  );
}

export default App;
