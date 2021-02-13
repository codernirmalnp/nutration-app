import React,{lazy,Suspense} from 'react';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import Cookie from 'js-cookie'
import Home from './Home'


import LoginScreen from './components/LoginScreen'
const Dashboard = lazy(() => import('./components/Dashboard'));
const Item=lazy(()=>import('./components/Item'))



function App() {
  const LoadingFallback = () => (

      <div className="p-4">Loading...</div>
  );
 
  function isAuthenticated(){

  
    const expiresAt=Cookie.get('expiresAt')
    if( new Date().getTime() / 1000 <  expiresAt  )
    {
      return true;
    }
    return false;

  }
  const AuthenticatedRoute = ({children}) => {

    return (
      <Route
      
        render={() =>
          isAuthenticated() ? (
            <div> {children}</div>
          
          ) : (
            <Redirect to="/" />
          )
        }
      ></Route>
    );
  };
  



  return (
    <>
    <BrowserRouter>

    <Route path="/" component={Home} exact></Route>
    <Route path="/login" component={LoginScreen} ></Route>
    <Suspense fallback={<LoadingFallback />}>
    <Switch>
   
    <AuthenticatedRoute path="/dashboard">
            <Dashboard />
    </AuthenticatedRoute>
    <AuthenticatedRoute path="/item">
            <Item />
    </AuthenticatedRoute>
    </Switch>
    </Suspense>
   
    </BrowserRouter>
    </>
  );
}

export default App;
