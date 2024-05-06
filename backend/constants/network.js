class HTTPStatusCode {
    static OK = 200;
    static CREATED = 201;
    static ACCEPTED = 202;
    static NO_CONTENT = 204;
    static RESET_CONTENT = 205;
    static FOUND = 302;
    static NOT_MODIFIED = 304;
    static BAD_REQUEST = 400;
    static UNAUTHORIZED = 401;
    static FORBIDDEN = 403;
    static NOT_FOUND = 404;
    static REQUEST_TIMEOUT = 408;
    static UNSUPPORTED_MEDIA_TYPE = 415;
    static UNPROCESSABLE_ENTITY = 422;
    static INTERNAL_SERVER_ERROR = 500;
    static BAD_GATEWAY = 502;
}
Object.freeze(HTTPStatusCode);

module.exports = {

    HTTPStatusCode
}