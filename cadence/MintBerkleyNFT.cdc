import BerkleyNFTContract from 0x01cf0e2f2f715450 

transaction(message: String?) {
    prepare(account: AuthAccount) {
        let BerkleyNFT: @BerkleyNFTContract.BerkleyNFT <- BerkleyNFTContract.mintBerkleyNFT(message: message)

        account.save(<-BerkleyNFT, to: /storage/BerkleyNFT)
        account.link<&BerkleyNFTContract.BerkleyNFT{BerkleyNFTContract.BerkleyNFTInterface}>(/public/BerkleyNFT, target: /storage/BerkleyNFT)
    }
    
    post {
        // Check that the capabilities were created correctly
        getAccount(0x01cf0e2f2f715450).getCapability(/public/BerkleyNFT)!
                        .check<&BerkleyNFTContract.BerkleyNFT{BerkleyNFTContract.BerkleyNFTInterface}>():  
                        "Identity Reference was not created correctly"
    }
}
 