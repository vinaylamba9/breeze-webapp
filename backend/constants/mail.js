class MailTemplateTitle {
    static FORGOT_PASSWORD = "FORGOT PASSWORD"
    static ACCOUNT_VERIFICATION = "ACCOUNT VERIFICATION"
}
Object.freeze(MailTemplateTitle)

class Replacer {
    static CONTENT_REPLACER = 'REPLACE_CONTENT_HERE'
};
Object.freeze(Replacer)

class MailSubject {
    static ACCOUNT_VERIFICATION = " Account Verification [ OTP for Breeze 🔑] "
    static FORGOT_PASSWORD = " Forgot Password [ OTP for Breeze 🔑]"
}

Object.freeze(MailSubject)
class EmailStatus {
    static ACTIVE = 0
    static DELETED = 0
}

module.exports = {
    Replacer,
    MailTemplateTitle,
    MailSubject,
    EmailStatus
}