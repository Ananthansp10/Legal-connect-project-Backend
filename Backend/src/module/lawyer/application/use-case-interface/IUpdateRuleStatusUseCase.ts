export interface IUpdateRuleStatusUseCase {
  execute(ruleId: string, ruleStatus: string): Promise<string>;
}
