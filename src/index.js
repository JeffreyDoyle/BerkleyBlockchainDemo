import React, { useState, useEffect } from 'react'
import regeneratorRuntime from "regenerator-runtime"
import ReactDOM from "react-dom"
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import { SignIn } from "./signin.js"
import { App } from "./app.js"
import "./app.scss"

window.fcl = fcl
window.types = t

fcl.config()
  .put("challenge.handshake", "http://localhost:8701/flow/authenticate")
  .put("accessNode.api", "http://localhost:8080")

const AppContainer = () => {
    const [message, setMessage] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        fcl.currentUser().subscribe(user => {
            console.log('>> User', user)
            if (user.loggedIn) setLoggedIn(true)
            else setLoggedIn(false)
        })
    }, [])

    return (
        <div>
            {
                ! loggedIn ?
                    <SignIn />
                    :
                    <App />
            }
        </div>
    )
}

ReactDOM.render(<AppContainer />, document.getElementById("APP"))
