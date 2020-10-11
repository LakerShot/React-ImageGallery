import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Main } from './pages'
import { AlbumDetail } from './pages/AlbumDetail/AlbumDetail'


const App = () => {
  return (
    <BrowserRouter>
      <>
        <Switch>
          <Redirect exact from="/" to="/main" />
          <Route component={Main} path="/main" exact />
          <Route component={AlbumDetail} path="/album/:id" />
        </Switch>
      </>
    </BrowserRouter>
  )
}

export default App
