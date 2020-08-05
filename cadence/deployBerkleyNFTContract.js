(async function() {
    // function convertToHex(str) {
    //     var hex = '';
    //     for(var i=0;i<str.length;i++) {
    //         hex += ''+str.charCodeAt(i).toString(16);
    //     }
    //     return hex;
    // }
    
    const respnose = await fcl.tx(await fcl.send([
        fcl.transaction`transaction(code: String) {
            prepare(signer: AuthAccount) {
                signer.setCode(code.decodeHex())
            }
        }`,
        fcl.args([ fcl.arg(convertToHex(`pub contract BerkleyNFTContract {
            pub resource interface BerkleyNFTInterface {
                pub fun getMessage(): String?
                pub fun setMessage(msg: String): Void
            }
        
            pub resource BerkleyNFT: BerkleyNFTInterface {
                access(self) var message: String?
        
                init(message: String?) {
                    self.message = message
                }
        
                pub fun getMessage(): String? {
                    return self.message
                }
                pub fun setMessage(msg: String): Void {
                    self.message = msg
                }
            }
        
            pub fun mintBerkleyNFT(message: String?): @BerkleyNFT {
                return <- create BerkleyNFT(message: message)
            }
        
            init() {
                log("BerkleyNFT Contract Init")
            }
        }
         `), types.String ) ]),
        fcl.ref((await fcl.decode(await fcl.send([fcl.getLatestBlock()]))).id),
        fcl.authorizations([ fcl.currentUser().authorization ]),
        fcl.payer(fcl.currentUser().authorization),
        fcl.proposer(fcl.currentUser().authorization)
    ])).onceSealed()
}())