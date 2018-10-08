
const backend = async (res) => {
  try {
    const result = await fetch(res.url);
    const data = await result.json();
    const header = await result.headers;
    const totals = {
      totalPagesPerPage: header.get(res.headers.page),
      totalPages: header.get(res.headers.total),
    };
    return ({ data, header, totals });
  } catch (error) {
    return null;
  }
};

export default backend;
