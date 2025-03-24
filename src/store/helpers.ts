export const formatAmount = (amount: number) => {
  return Math.abs(amount).toLocaleString("en-US", {});
};
