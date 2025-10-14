"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.planModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const plansSchema = new mongoose_1.default.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  planType: {
    type: String,
    required: true,
  },
  totalAppointments: {
    type: String,
    requird: true,
  },
  features: [
    {
      type: String,
      required: true,
    },
  ],
  status: {
    type: Boolean,
    required: true,
  },
  isDeleted: {
    type: Boolean,
  },
});
exports.planModel = mongoose_1.default.model("plans", plansSchema);
