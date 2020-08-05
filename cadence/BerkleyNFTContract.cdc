pub contract BerkeleyNFTContract {
    pub resource interface BerkeleyNFTInterface {
        pub fun getMessage(): String?
        pub fun setMessage(msg: String): Void
    }
    pub resource BerkeleyNFT: BerkeleyNFTInterface {
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
    pub fun mintBerkeleyNFT(message: String?): @BerkeleyNFT {
        return <- create BerkeleyNFT(message: message)
    }
    init() {
        log("BerkeleyNFT Contract Init")
    }
}