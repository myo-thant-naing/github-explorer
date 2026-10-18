const github = async (API_URL) => {
  try {
    const response = await fetch(API_URL);
    if (response.status === 404) {
      throw new Error("Not Found");
    } else if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return [data, null];
  } catch (error) {
    return [{}, error.message];
  }
};

export default github;
