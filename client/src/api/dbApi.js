export const connectDB = async () => {
  const res = await fetch('/connect');
  if (res.status >= 400) {
    throw new Error('No DB Connection, unable to connect');
  }
  const data = res.json();
  return data;
};
