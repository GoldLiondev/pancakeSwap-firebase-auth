import React, { lazy, useEffect, useState } from 'react'
import { Router, Redirect, Switch } from 'react-router-dom'
import { PrivateRoute, CommonRouter } from 'components/Router/index'
import { ResetCSS } from '@pancakeswap/uikit'
import SuspenseWithChunkError from 'components/SuspenseWithChunkError'
import PageLoader from 'components/PageLoader'
import BigNumber from 'bignumber.js'
import { auth } from 'firebaseClient/firebase'
import Logout from 'components/Logout/logout'
import setAuthToken from 'utils/setAuthToken'
import { useSetAuth } from 'state/hooks'
import GlobalStyle from './style/Global'
import ToastListener from './components/ToastListener'
import EasterEgg from './components/EasterEgg'
import Pools from './views/Pools'
import history from './routerHistory'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Login = lazy(() => import('./views/Login'))
const Profile = lazy(() => import('./views/UserProfile'))
const Register = lazy(() => import('./views/Register'))
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Lottery = lazy(() => import('./views/Lottery'))
const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
const Collectibles = lazy(() => import('./views/Collectibles'))
const Teams = lazy(() => import('./views/Teams'))
const Team = lazy(() => import('./views/Teams/Team'))
const TradingCompetition = lazy(() => import('./views/TradingCompetition'))
const Predictions = lazy(() => import('./views/Predictions'))
const UserList = lazy(() => import('./views/UserList'))
const KYC = lazy(() => import('./views/KYC'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState({ useremail: '', userrole: '' })
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await auth.currentUser
          .getIdTokenResult()
          .then((idTokenResult) => {
            // Confirm the user is an Admin.
            const { email, role } = idTokenResult.claims
            setUserInfo({ useremail: email, userrole: role })
            setAuthToken(idTokenResult.token)
          })
          .catch((error) => {
            console.log(error)
          })

        //
      } else {
        auth.signOut()
        setUserInfo({ useremail: '', userrole: '' })
        await setAuthToken('')
      }
    })

    return unsubscribe
  }, [])
  useSetAuth(userInfo)

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <SuspenseWithChunkError fallback={<PageLoader />}>
        <Switch>
          {/* AuthRouter */}
          <CommonRouter path="/login">
            <Login />
          </CommonRouter>
          <CommonRouter path="/register">
            <Register />
          </CommonRouter>

          {/* Private Router */}
          <PrivateRoute path="/" exact>
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/farms">
            <Farms />
          </PrivateRoute>
          <PrivateRoute path="/pools">
            <Pools />
          </PrivateRoute>
          <PrivateRoute path="/lottery">
            <Lottery />
          </PrivateRoute>
          <PrivateRoute path="/ifo">
            <Ifos />
          </PrivateRoute>
          <PrivateRoute path="/collectibles">
            <Collectibles />
          </PrivateRoute>
          <PrivateRoute exact path="/teams">
            <Teams />
          </PrivateRoute>
          <PrivateRoute path="/teams/:id">
            <Team />
          </PrivateRoute>
          <PrivateRoute path="/submitKyc">
            <KYC />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/competition">
            <TradingCompetition />
          </PrivateRoute>
          <PrivateRoute path="/prediction">
            <Predictions />
          </PrivateRoute>
          {/* Redirect */}
          <PrivateRoute path="/staking">
            <Redirect to="/pools" />
          </PrivateRoute>
          <PrivateRoute path="/syrup">
            <Redirect to="/pools" />
          </PrivateRoute>
          <PrivateRoute path="/nft">
            <Redirect to="/collectibles" />
          </PrivateRoute>
          <PrivateRoute path="/userlist" exact admin>
            <UserList />
          </PrivateRoute>
          <PrivateRoute path="/logout">
            <Logout />
          </PrivateRoute>
          {/* 404 */}
          <CommonRouter>
            <NotFound />
          </CommonRouter>
        </Switch>
      </SuspenseWithChunkError>

      <EasterEgg iterations={2} />
      <ToastListener />
    </Router>
  )
}

export default React.memo(App)
