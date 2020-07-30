import BerkleyNFTContract from 0x01cf0e2f2f715450

pub fun main(): String {
    let BerkleyNFTCapability = getAccount(0x01cf0e2f2f715450).getCapability(/public/BerkleyNFT)!
    let BerkleyNFTRef = BerkleyNFTCapability.borrow<&BerkleyNFTContract.BerkleyNFT>()! as &BerkleyNFTContract.BerkleyNFT
    return BerkleyNFTRef.getMessage()
}