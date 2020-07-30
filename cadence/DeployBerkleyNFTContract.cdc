transaction(code: String) {
    prepare(signer: AuthAccount) {
        let acct = AuthAccount(payer: signer)
        acct.setCode(code.decodeHex())
    }
}