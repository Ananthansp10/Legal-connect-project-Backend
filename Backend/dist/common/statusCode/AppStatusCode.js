"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppStatusCode = void 0;
var AppStatusCode;
(function (AppStatusCode) {
  AppStatusCode[(AppStatusCode["SUCCESS_CODE"] = 200)] = "SUCCESS_CODE";
  AppStatusCode[(AppStatusCode["INTERNAL_ERROR_CODE"] = 500)] =
    "INTERNAL_ERROR_CODE";
  AppStatusCode[(AppStatusCode["BAD_REQUEST_CODE"] = 400)] = "BAD_REQUEST_CODE";
  AppStatusCode[(AppStatusCode["ACCOUNT_BLOCKED"] = 403)] = "ACCOUNT_BLOCKED";
  AppStatusCode[(AppStatusCode["UNAUTHORIZED"] = 401)] = "UNAUTHORIZED";
  AppStatusCode[(AppStatusCode["NOT_FOUND"] = 404)] = "NOT_FOUND";
  AppStatusCode[(AppStatusCode["CONFLICT"] = 409)] = "CONFLICT";
  AppStatusCode[(AppStatusCode["EXPIRED"] = 410)] = "EXPIRED";
  AppStatusCode[(AppStatusCode["UNAVAILABLE"] = 503)] = "UNAVAILABLE";
  AppStatusCode[(AppStatusCode["PAYMENT_FAILED"] = 402)] = "PAYMENT_FAILED";
})(AppStatusCode || (exports.AppStatusCode = AppStatusCode = {}));
