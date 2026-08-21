// Pure, client-side estimation math. No network, no persistence.

export interface CalculatorInputs {
  monthlyLeads: number;
  missedPct: number; // 0-100
  customerValue: number;
  closeRatePct: number; // 0-100
  weeklyAdminHours: number;
  hourlyCost: number;
  automatablePct: number; // 0-100
  recoveryPct: number; // 0-100, default 35
}

export interface CalculatorResults {
  missedLeads: number;
  recoverableCustomers: number;
  revenueOpportunity: number;
  monthlyAdminHours: number;
  hoursSaved: number;
  laborValue: number;
  monthlyOpportunity: number;
  annualOpportunity: number;
}

export const WEEKS_PER_MONTH = 4.33;
export const DEFAULT_RECOVERY_PCT = 35;

export const DEFAULT_INPUTS: CalculatorInputs = {
  monthlyLeads: 80,
  missedPct: 25,
  customerValue: 1200,
  closeRatePct: 30,
  weeklyAdminHours: 10,
  hourlyCost: 25,
  automatablePct: 40,
  recoveryPct: DEFAULT_RECOVERY_PCT,
};

export const LIMITS: Record<keyof CalculatorInputs, { min: number; max: number; step: number }> = {
  monthlyLeads: { min: 0, max: 5000, step: 1 },
  missedPct: { min: 0, max: 100, step: 1 },
  customerValue: { min: 0, max: 250000, step: 50 },
  closeRatePct: { min: 0, max: 100, step: 1 },
  weeklyAdminHours: { min: 0, max: 200, step: 1 },
  hourlyCost: { min: 0, max: 500, step: 1 },
  automatablePct: { min: 0, max: 100, step: 1 },
  recoveryPct: { min: 0, max: 100, step: 1 },
};

export function clampInput(key: keyof CalculatorInputs, value: number) {
  const { min, max } = LIMITS[key];
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function calculate(input: CalculatorInputs): CalculatorResults {
  const missedLeads = input.monthlyLeads * (input.missedPct / 100);
  const recoverableCustomers =
    missedLeads * (input.closeRatePct / 100) * (input.recoveryPct / 100);
  const revenueOpportunity = recoverableCustomers * input.customerValue;

  const monthlyAdminHours = input.weeklyAdminHours * WEEKS_PER_MONTH;
  const hoursSaved = monthlyAdminHours * (input.automatablePct / 100);
  const laborValue = hoursSaved * input.hourlyCost;

  const monthlyOpportunity = revenueOpportunity + laborValue;

  return {
    missedLeads,
    recoverableCustomers,
    revenueOpportunity,
    monthlyAdminHours,
    hoursSaved,
    laborValue,
    monthlyOpportunity,
    annualOpportunity: monthlyOpportunity * 12,
  };
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const formatCurrency = (n: number) => currency.format(Math.round(n));
export const formatNumber = (n: number, digits = 0) =>
  n.toLocaleString("en-US", { maximumFractionDigits: digits });
