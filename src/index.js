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

window.convertToHex = function(str) {
    return Buffer.from(str, "utf8").reduce(
        (output, elem) => output + ("0" + elem.toString(16)).slice(-2),
        ""
      )
}

//window.BERKELEY_NFT_CONTRACT_ADDRESS = "0x179b6b1cb6755e31" // Emulator
window.BERKELEY_NFT_CONTRACT_ADDRESS = "0x8d70ad6953de1e42" // Testnet

fcl.config()
    // .put("accessNode.api", "http://localhost:8080")
    // .put("challenge.handshake", "http://localhost:8701/flow/authenticate");
    .put("accessNode.api", "https://access-testnet.onflow.org")
    .put("challenge.handshake", "https://flow-wallet-staging.blocto.app/authn");

const AppContainer = () => {
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
                !loggedIn ?
                    <SignIn />
                    :
                    <App />
            }
        </div>
    )
}

ReactDOM.render(<AppContainer />, document.getElementById("APP"))
