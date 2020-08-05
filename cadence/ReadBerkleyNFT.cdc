import BerkleyNFTContract from 0x6c820df8a4654c07

pub fun main(address: Address): String {
    let BerkleyNFTCapability = getAccount(address).getCapability(/public/BerkleyNFT)
    
    if (BerkleyNFTCapability == nil) {
        return ""
    }

    let BerkleyNFTRef = BerkleyNFTCapability.borrow<&BerkleyNFTContract.BerkleyNFT{BerkleyNFTContract.BerkleyNFTInterface}>() as &BerkleyNFTContract.BerkleyNFT{BerkleyNFTContract.BerkleyNFTInterface}
    return BerkleyNFTRef.getMessage()
}