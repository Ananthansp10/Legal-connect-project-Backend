"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBankAccountDetailsUseCase = void 0;
const axios_1 = __importDefault(require("axios"));
class AddBankAccountDetailsUseCase {
  constructor(_bankDetailsRepo) {
    this._bankDetailsRepo = _bankDetailsRepo;
  }
  execute(data) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      try {
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        const auth =
          "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
        const linkedAccount = yield axios_1.default.post(
          process.env.LINKED_ACCOUNT_URL,
          {
            type: "route",
            reference_id: data.lawyerId.toString().slice(0, 20),
            email: data.email,
            phone: data.phoneNumber,
            legal_business_name: "Legal Connect",
            business_type: "individual",
            contact_name: "John Doe",
            profile: {
              category: "services",
              subcategory: "professional_services",
              addresses: {
                registered: {
                  street1: "123, MG Road",
                  street2: "1st Block",
                  city: "Bengaluru",
                  state: "Karnataka",
                  postal_code: "560001",
                  country: "IN",
                },
              },
            },
          },
          {
            headers: {
              Authorization: auth,
              "Content-Type": "application/json",
            },
          },
        );
        console.log("Linked Account ID:", linkedAccount);
        const contact = yield axios_1.default.post(
          process.env.CONTACT_URL,
          {
            name: data.name,
            email: data.email,
            contact: data.phoneNumber,
            type: "vendor",
            reference_id: linkedAccount.data.id,
          },
          { headers: { Authorization: auth } },
        );
        console.log("✅ Contact Created:", contact.data.id);
        const fundAccount = yield axios_1.default.post(
          process.env.FUND_ACCOUNT_URL,
          {
            contact_id: contact.data.id,
            account_type: "bank_account",
            bank_account: {
              name: data.name,
              ifsc: data.ifscCode,
              account_number: data.bankAccountNumber,
            },
          },
          { headers: { Authorization: auth } },
        );
        console.log("✅ Fund Account Created:", fundAccount.data.id);
        yield this._bankDetailsRepo.addBankDetails(
          data.lawyerId,
          linkedAccount.data.id,
          fundAccount.data.id,
        );
      } catch (error) {
        console.error(
          "Razorpay Error:",
          ((_a = error.response) === null || _a === void 0
            ? void 0
            : _a.data) || error.message,
        );
        if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Headers:", error.response.headers);
        }
        throw error;
      }
    });
  }
}
exports.AddBankAccountDetailsUseCase = AddBankAccountDetailsUseCase;
