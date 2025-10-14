"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.lawyerModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const lawyerSignupSchema = new mongoose_1.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    specialization: [
      {
        type: String,
      },
    ],
    experience: {
      type: String,
      required: true,
    },
    barCouncilNumber: {
      type: String,
      required: true,
    },
    documents: [
      {
        type: String,
      },
    ],
    isBlock: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    reason: {
      type: String,
    },
  },
  { timestamps: true },
);
exports.lawyerModel = mongoose_2.default.model("lawyer", lawyerSignupSchema);
