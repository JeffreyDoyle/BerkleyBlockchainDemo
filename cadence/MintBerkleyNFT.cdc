import BerkleyNFTContract from 0x6c820df8a4654c07 

transaction() {
    prepare(account: AuthAccount, message: String?) {
        let oldBerkleyNFT: @BerkleyNFTContract.BerkleyNFT <- account.load(from: "/storage/BerkleyNFT")

        if (oldBerkleyNFT != nil) {
            destroy oldBerkleyNFT
        }
        
        let BerkleyNFT: @BerkleyNFTContract.BerkleyNFT <- BerkleyNFTContract.mintBerkleyNFT(message: message)

        account.save(<-BerkleyNFT, to: /storage/BerkleyNFT)
        account.link<&BerkleyNFTContract.BerkleyNFT{BerkleyNFTContract.BerkleyNFTInterface}>(/public/BerkleyNFT, target: /storage/BerkleyNFT)
    }
}
 