export const formattedDate = (intDate: Date | string) => {
  const date = new Date(intDate);

  // Format the components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  // Combine into the desired format
  return `${day}-${month}-${year} ${hours}:${minutes} ${period}`;
};
