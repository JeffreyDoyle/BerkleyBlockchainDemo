pub contract BerkleyNFTContract {
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