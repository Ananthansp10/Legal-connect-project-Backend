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
exports.expirePlan = exports.activatePlan = void 0;
const planRepository_1 = require("../repository/planRepository");
const activateSubscriptionPlanUseCase_1 = require("../../application/use-case/activateSubscriptionPlanUseCase");
const expireSubscriptionPlanUseCase_1 = require("../../application/use-case/expireSubscriptionPlanUseCase");
const node_cron_1 = __importDefault(require("node-cron"));
const planRepo = new planRepository_1.PlanRepository();
const activateSubscriptionPlanUseCase =
  new activateSubscriptionPlanUseCase_1.ActivateSubscriptionPlanUseCase(
    planRepo,
  );
const expireSubscriptionPlanUseCase =
  new expireSubscriptionPlanUseCase_1.ExpireSubscriptionPlanUseCase(planRepo);
const activatePlan = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    node_cron_1.default.schedule("0 0 * * *", () =>
      __awaiter(void 0, void 0, void 0, function* () {
        yield activateSubscriptionPlanUseCase.execute();
      }),
    );
  });
exports.activatePlan = activatePlan;
const expirePlan = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    node_cron_1.default.schedule("0 0 * * *", () =>
      __awaiter(void 0, void 0, void 0, function* () {
        yield expireSubscriptionPlanUseCase.execute();
      }),
    );
  });
exports.expirePlan = expirePlan;
