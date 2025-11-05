const getPropertyRates = (
  rates: Record<'monthly' | 'weekly' | 'nightly', number>
) => {
  if (rates.monthly > 0) {
    return `${rates.monthly.toLocaleString()}/mo`;
  }
  if (rates.weekly > 0) {
    return `${rates.weekly.toLocaleString()}/wk`;
  }
  if (rates.nightly > 0) {
    return `${rates.nightly.toLocaleString()}/night`;
  }
};
export default getPropertyRates;
