import './App.scss';
import { MainPage } from './pages';
//import { auth } from './firebase';
//import { AppContext } from './context';
//import { LoadingPage } from './pages/LoadingPage';

const App = () => {
  /* const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { setEmail, setDisplayName } = useContext(AppContext);

  auth.onAuthStateChanged(user => {
    if (user) {
      sessionStorage.setItem('userUID', user.uid);
      setEmail(user.email);
      setDisplayName(user.displayName);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsDataLoaded(true);
  });

  if (!isDataLoaded) return <LoadingPage />;

  return isAuthenticated ? <MatrixApp /> : <Auth />; */
  return <MainPage />;
};

export default App;
