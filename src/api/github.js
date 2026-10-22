const github = async (API_URL) => {
  const response = await fetch(API_URL);

  if (response.status === 404) {
    throw new Error("Not Found");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return await response.json();
};

export default github;
