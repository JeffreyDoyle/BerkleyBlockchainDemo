import BerkeleyNFTContract from ${BERKELEY_NFT_CONTRACT_ADDRESS}
pub fun main(): String? {
    let BerkeleyNFTCapability = getAccount(${addr}).getCapability(/public/BerkeleyNFT)
    
    if (BerkeleyNFTCapability! == nil) {
        return ""
    }

    let BerkeleyNFTRef = BerkeleyNFTCapability!.borrow<&BerkeleyNFTContract.BerkeleyNFT{BerkeleyNFTContract.BerkeleyNFTInterface}>()!
    return BerkeleyNFTRef.getMessage()
}