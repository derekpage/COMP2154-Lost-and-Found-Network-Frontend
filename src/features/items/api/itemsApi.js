import http from "../../../services/httpClient";
import { getToken } from "../../../services/authStorage";

async function listItems() {
  return await http.get("/items");
}

async function getItemById(id) {
  return await http.get(`/items/${id}`);
}

async function updateItem(id, updatedFields) {
  return await http.put(`/items/${id}`, updatedFields);
}

async function softDeleteItem(id) {
  return await http.patch(`/items/${id}/soft-delete`);
}

async function createItem(data) {
  const formData = new FormData();
  formData.append("category", data.category);
  formData.append("description", data.description);
  formData.append("date", data.date);
  formData.append("campus", data.campus);
  if (data.location) formData.append("location", data.location);
  formData.append("type", data.type || "LOST");
  if (data.image) {
    formData.append("image", data.image);
  }

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = getToken();
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  let responseData = null;
  try {
    responseData = await res.json();
  } catch {
    // ignore non-JSON
  }

  if (!res.ok) {
    const msg = responseData?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return responseData;
}

export { listItems, getItemById, updateItem, softDeleteItem, createItem };