export const filter = async (
  region: string,
  file: file
): Promise<filteredData> => {
  const newInput = region.replace(/[^a-z0-9áéíóúñü ,_-]/gim, "").trim();
  const newArray = file.find((r) => r.salesforceName === newInput);

  if (newArray) {
    const approvers = newArray.approvers.join(", ");
    const label = newArray.label;
    return [approvers, label];
  }

  throw new Error(
    `The region sent from Salesforce did not match a local record. The value from salesforce was: ${region}`
  );
};
