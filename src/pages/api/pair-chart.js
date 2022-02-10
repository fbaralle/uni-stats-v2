const handler = async (req, res) => {
  const { data, status } = getPairs();

  res.status(status);
  res.json(data);
};

export default handler;
