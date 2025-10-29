const getPropertyRates = (
  rates: Partial<Record<'monthly' | 'weekly' | 'nightly', number>>
) => {
  if (rates.monthly) {
    return `${rates.monthly.toLocaleString()}/mo`;
  }
  if (rates.weekly) {
    return `${rates.weekly.toLocaleString()}/wk`;
  }
  if (rates.nightly) {
    return `${rates.nightly.toLocaleString()}/night`;
  }
};
export default getPropertyRates;
