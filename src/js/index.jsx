import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

import io from 'socket.io-client'

import Main from './components/Main/Main'

import reducer from './reducers'
import saga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    reducer,
    (window.__REDUX_DEVTOOLS_EXTENSION__
        && window.__REDUX_DEVTOOLS_EXTENSION__()),
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(saga)

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('ReactRoot')
);

store.dispatch({ type: 'FETCH_PORTS_REQUEST' })
store.dispatch({ type: 'FETCH_STATUS' })

window.setInterval(() => {
    store.dispatch({ type: 'FETCH_STATUS' })
}, 5000)

const socket = io.connect(`http://${window.location.hostname}:5050/`)

socket.on('rssiRaw', (data) => {
    store.dispatch({ type: 'RECEIVE_RSSI_RAW', rssi: data.rssi })
})

socket.on('rssiFiltered', (data) => {
    store.dispatch({ type: 'RECEIVE_RSSI_FILTERED', rssi: data.rssi })
})

