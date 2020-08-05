import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import "./app.scss"

export const App = () => {
    const [messageInput, setMessageInput] = useState("")
    const [addressInput, setAddressInput] = useState("")
    const [myBerkleyNFTMessage, setMyBerkleyNFTMessage] = useState("")
    const [theirBerkleyNFTMessage, setTheirBerkleyNFTMessage] = useState("")
    const [currentUser, setCurrentUser] = useState(null)
    const [curerntUserLoaded, setCurrentUserLoaded] = useState(false);

    useEffect(() => {
        fcl.currentUser().subscribe(user => {
            if (user) {
                setCurrentUser(user)
                setCurrentUserLoaded(true)
            }
            else setCurrentUser(null)
        })
    }, [])

    useEffect(() => {
        (async () => {
            if (currentUser && currentUser.addr) {
                setMyBerkleyNFTMessage(await readBerkleyNFTMessage("0x" + currentUser.addr))
            }
        })()
    }, [curerntUserLoaded])

    const readBerkleyNFTMessage = async (addr) => {
        const response = await fcl.send([
            fcl.script`
                import BerkeleyNFTContract from ${BERKELEY_NFT_CONTRACT_ADDRESS}
                pub fun main(): String? {
                    let BerkeleyNFTCapability = getAccount(${addr}).getCapability(/public/BerkeleyNFT)
                    
                    if (BerkeleyNFTCapability == nil) {
                        return ""
                    }

                    let BerkeleyNFTRef = BerkeleyNFTCapability!.borrow<&BerkeleyNFTContract.BerkeleyNFT{BerkeleyNFTContract.BerkeleyNFTInterface}>()! as &BerkeleyNFTContract.BerkeleyNFT{BerkeleyNFTContract.BerkeleyNFTInterface}
                    return BerkeleyNFTRef.getMessage()
                }
            `
        ])

        return await fcl.decode(response)
    }

    const mintBerkleyNFT = async () => {
        const response = await fcl.send([
            fcl.transaction`
                import BerkeleyNFTContract from ${BERKELEY_NFT_CONTRACT_ADDRESS}
                transaction(message: String) {
                    prepare(account: AuthAccount) {
                        let oldBerkeleyNFT <- account.load<@BerkeleyNFTContract.BerkeleyNFT>(from: /storage/BerkeleyNFT)
                        destroy oldBerkeleyNFT
                        
                        let BerkeleyNFT: @BerkeleyNFTContract.BerkeleyNFT <- BerkeleyNFTContract.mintBerkeleyNFT(message: message)
                
                        account.save(<-BerkeleyNFT, to: /storage/BerkeleyNFT)
                        account.link<&BerkeleyNFTContract.BerkeleyNFT{BerkeleyNFTContract.BerkeleyNFTInterface}>(/public/BerkeleyNFT, target: /storage/BerkeleyNFT)
                    }
                }
            `,
            fcl.limit(1000),
            fcl.args([ fcl.arg(messageInput, t.String) ]),
            fcl.ref((await fcl.decode(await fcl.send([fcl.getLatestBlock()]))).id),
            fcl.authorizations([ fcl.currentUser().authorization ]),
            fcl.payer(fcl.currentUser().authorization),
            fcl.proposer(fcl.currentUser().authorization)     
        ])

        await fcl.tx(response).onceSealed()

        setMyBerkleyNFTMessage(await readBerkleyNFTMessage("0x" + currentUser.addr))
    }

    return (
        <div className="App">
            <div className="AppTitle">
                Blockchain@Berkley FCL Demo
            </div>
            <div className="AppUserInfo">
                <div>Address: 0x{currentUser && currentUser.addr}</div>
                <button onClick={fcl.unauthenticate}>Sign Out</button>
            </div>
            <div className="AppMintNFT">
                <button onClick={mintBerkleyNFT}>Mint a BerkleyNFT</button>
                <input value={messageInput} placeholder="My NFT's Message" onChange={e => setMessageInput(e.target.value)} type="text" />
            </div>
            <div className="AppMyNFT">
                <h2>My BerkleyNFT</h2>
                <p>{myBerkleyNFTMessage || "My BerkleyNFT Message Placeholder"}</p>
            </div>
            <br />
            <div className="AppReadNFT">
                <button onClick={async () => setTheirBerkleyNFTMessage(await readBerkleyNFTMessage(addressInput))}>Read someones BerkleyNFT</button>
                <input value={addressInput} placeholder="Flow Address" onChange={e => setAddressInput(e.target.value)} type="text" />
            </div>
            <div className="TheirNFT">
                <h2>Their BerkleyNFT</h2>
                <p>{theirBerkleyNFTMessage || "Their BerkleyNFT Message Placeholder"}</p>
            </div>
        </div>
    )
}
