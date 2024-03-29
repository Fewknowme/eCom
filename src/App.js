import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Switch,Route} from 'react-router-dom';
import { checkUserSession } from './redux/User/user.actions';

//components
import AdminToolbar from './components/AdminToolbar';

//hoc - higher order component 
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

//Layouts Here
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';

//Pages here
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Search from './pages/Search';
import Recovery from './pages/Recovery';
import './default.scss';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

const App = props =>
{
  const dispatch = useDispatch();

useEffect(()=>{
  dispatch(checkUserSession());
}, []);

    return (
      <div className="App">
        <AdminToolbar/>
          <Switch>
            <Route exact path="/" render={()=>(
              <HomepageLayout>
                 <Homepage/>
              </HomepageLayout>
            )}/>
              <Route path="/search" render={()=>(
              <MainLayout>
                 <Search />
              </MainLayout>
            )}/>
            <Route path="/registration" render={()=>(
              <MainLayout>
                 <Registration />
              </MainLayout>
            )}/>
             <Route path="/login" 
             render={()=>(
              <MainLayout>
                 <Login/>
              </MainLayout>
            )}/>
            <Route path="/recovery" 
             render={()=>(
              <MainLayout>
                <Recovery/>
              </MainLayout>
             )}/>
             <Route path="/admin"
             render={()=>(
              <WithAdminAuth>
              <AdminLayout>
                <Admin/>
              </AdminLayout>
              </WithAdminAuth>
             )}/>
             <Route path="/dashboard" 
             render={()=>(
              <WithAuth>
                  <DashboardLayout>
                    <Dashboard/>
                  </DashboardLayout>
              </WithAuth>   
             )}/>
             
          </Switch>
      </div>);
    }

    export default App;
    