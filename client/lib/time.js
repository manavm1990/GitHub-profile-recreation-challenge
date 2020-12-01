const pluralize = (num) => (num === 1 ? "" : "s");

export default (dateTime) => {
  // Milliseconds
  const updatedDate = new Date(dateTime);
  const secs = Math.round((Date.now() - updatedDate) / 1000);

  // Less than a minute
  if (secs < 60) {
    return `${secs} minute${pluralize(secs)} ago`;
  }

  // Less than an hour
  if (secs < 3600) {
    const minutes = Math.round(secs / 60);

    return `${minutes} minute${pluralize(minutes)} ago`;
  }

  if (secs < 86400) {
    const hours = Math.round(secs / 3600);
    return `${hours} hour${pluralize(hours)} ago`;
  }

  // Less than a month
  if (secs < 2.628e6) {
    const days = Math.round(secs / 86400);
    return `${days} day${pluralize(days)} ago`;
  }

  return `on ${new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(updatedDate)}`;
};
