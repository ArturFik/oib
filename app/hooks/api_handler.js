import AUTH from "~/configs/routes/auth";
import { useUserStore } from "~/stores/user";


const STATIC_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteS1hcHAiLCJzdWIiOiJjZWVkYjE4Yi0yZWUxLTRkMzktODQ5Ny02NDU4YzkxYmRmMjUiLCJleHAiOjE3NjYwODk3MTMsImlhdCI6MTc2NjAwMzMxM30.Vhn07uqooZYe8QeVQMu92umaxEjBM3LHj20CEhCpytg";


async function downloadFile(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${STATIC_TOKEN}`,
      },
    });
    if (!response.ok)
      throw new Error(`Ошибка загрузки файла: ${response.statusText}`);

    const blob = await response.blob();
    const fileNameValue =
      response.headers
        .get("content-disposition")
        ?.split("filename*=UTF-8''")?.[1]
        ?.replace(/"/g, "") || null;
    let fileName;
    if (fileNameValue !== null) {
      fileName = decodeURIComponent(fileNameValue);
    } else {
      fileName = null;
    }

    const link = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(blob),
      download: fileName,
    });

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (e) {
    console.error("Ошибка загрузки файла:", e);
  }
}

export default async function API_HANDLER(payload) {
  const { path, method, args, isDownload = false, headers = {}, ...params } =
    payload;
  const { MAIN_API_URL } = useRuntimeConfig().public;
  const { getToken } = useUserStore();

  const url = `${MAIN_API_URL}/${path}${args ? args : ""}`;

  const authHeaders = {
    Authorization: `Bearer ${STATIC_TOKEN}`,
    ...headers,
  };

  try {
    if (isDownload) {
      return await downloadFile(url);
    }
    const response_data = await $fetch(url, {
      method,
      credentials: "include",
      headers: authHeaders,
      ...params,
    });
    return response_data;
  } catch (e) {
    console.log("ER", e);
  }
}
