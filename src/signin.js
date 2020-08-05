import React from "react"
import * as fcl from "@onflow/fcl"
import "./signin.scss"

export const SignIn = () => (
    <div className="SignInContainer">
        <h1 className="SignInTitle">Blockchain@Berkley FCL Demo</h1>
        <button className="SignInButton" onClick={fcl.authenticate}>Sign In / Sign Up</button>
    </div>
)

 