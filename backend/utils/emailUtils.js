const { EmailStatus, Replacer } = require("../constants/mail");
const { EMAIL_DB_UTILs } = require("./dbUtils");

const EMAIL_UTILS = {
    getByTitle: async function (title, selectedKeys, status = EmailStatus.ACTIVE) {
        try {
            let emailTemp = await EMAIL_DB_UTILs.findTitle(title, selectedKeys.status)
            return emailTemp;
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    },
    mailParser: function (body, data) {
        try {
            data.forEach((element, index) => {
                body = body.replace(Replacer.CONTENT_REPLACER, element)
            });
            return body;
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    }
}

module.exports = {
    EMAIL_UTILS
}