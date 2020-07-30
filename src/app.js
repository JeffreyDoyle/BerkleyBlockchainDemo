import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import "./app.scss"

export const App = () => {
    const [messageInput, setMessageInput] = useState("")
    const [addressInput, setAddressInput] = useState("")
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        fcl.currentUser().subscribe(user => {
            console.log('>> User', user)
            if (user) setCurrentUser(user)
            else setCurrentUser(null)
        })
    }, [])
    return (
        <div className="App">
            <div className="AppTitle">
                Blockchain@Berkley FCL Demo
            </div>
            <div className="AppUserInfo">
                <div>Address: {currentUser && currentUser.addr}</div>
                <button onClick={fcl.unauthenticate}>Sign Out</button>
            </div>
            <div className="AppMintNFT">
                <button>Mint a BerkleyNFT</button>
                <input value={messageInput} placeholder="My NFT's Message" onChange={e => setMessageInput(e.target.value)} type="text" />
            </div>
            <div className="AppMyNFT">
                <h2>My BerkleyNFT</h2>
                <p>My BerkleyNFT Placeholder</p>
            </div>
            <br />
            <div className="AppReadNFT">
                <button>Read someones BerkleyNFT</button>
                <input value={addressInput} placeholder="Flow Address" onChange={e => setAddressInput(e.target.value)} type="text" />
            </div>
            <div className="TheirNFT">
                <h2>Their BerkleyNFT</h2>
                <p>Their BerkleyNFT Placeholder</p>
            </div>
        </div>
    )
}
