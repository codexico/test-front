import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components/macro'

import { apiData } from './api/api'

import Navigation from './components/Navigation/Navigation'

import Basket from './pages/Basket/Basket'
import Confirmation from './pages/Confirmation/Confirmation'
import Payment from './pages/Payment/Payment'

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`
const StyledPage = styled.div`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #eee;
  min-height: 100vh;
`

const App = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    name: '',
    date: ''
  })
  const [data, setData] = useState({})

  useEffect(() => {
    apiData().then(({ data }) => setData(data))
  }, [])

  return (
    <>
      <GlobalStyles />
      <StyledPage>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/">
              <Basket data={data} />
            </Route>
            <Route path="/pagamento">
              <Payment setPaymentData={setPaymentData} />
            </Route>
            <Route path="/confirmacao">
              <Confirmation paymentData={paymentData} data={data} />
            </Route>
          </Switch>
        </Router>
      </StyledPage>
    </>
  )
}

export default App
