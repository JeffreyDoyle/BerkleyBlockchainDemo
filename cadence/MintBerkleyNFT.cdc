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