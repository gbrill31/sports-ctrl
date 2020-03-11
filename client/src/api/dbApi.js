export const connectDB = async () => {
  const res = await fetch('/connect');
  const data = res.json();
  if (res.status >= 400) {
    throw new Error('No DB Connection, unable to connect');
  }
  return data;
};
