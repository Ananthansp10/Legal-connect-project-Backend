import { PlanRepository } from "../repository/planRepository";
import { ActivateSubscriptionPlanUseCase } from "../../application/use-case/activateSubscriptionPlanUseCase";
import { ExpireSubscriptionPlanUseCase } from "../../application/use-case/expireSubscriptionPlanUseCase";
import cron from "node-cron";

const planRepo = new PlanRepository();
const activateSubscriptionPlanUseCase = new ActivateSubscriptionPlanUseCase(
  planRepo,
);
const expireSubscriptionPlanUseCase = new ExpireSubscriptionPlanUseCase(
  planRepo,
);

export const activatePlan = async () => {
  cron.schedule("0 0 * * *", async () => {
    await activateSubscriptionPlanUseCase.execute();
  });
};

export const expirePlan = async () => {
  cron.schedule("0 0 * * *", async () => {
    await expireSubscriptionPlanUseCase.execute();
  });
};
