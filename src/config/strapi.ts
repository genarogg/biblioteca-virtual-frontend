/* const API_URL = process.env.STRAPI_API_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

interface PostData {
  // Define aquí las propiedades esperadas de postData
  // Por ejemplo:
  title: string;
  content: string;
}

export const createPost = async (postData: PostData): Promise<any> => {
  const response = await fetch(`${API_URL}/api/trabajos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
 */