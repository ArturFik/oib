import AUTH from "~/configs/routes/auth";

async function downloadFile(url) {
  try {

    const headers = {};

    if (getToken?.access_token && getToken?.token_type) {
      headers.Authorization = `${getToken.token_type} ${getToken.access_token}`;
    }

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers,
    });

    if (!response.ok)
      throw new Error(`Ошибка загрузки файла: ${response.statusText}`);

    const blob = await response.blob();
    const fileNameValue =
      response.headers
        .get("content-disposition")
        ?.split("filename*=UTF-8''")?.[1]
        ?.replace(/"/g, "") || null;

    const fileName =
      fileNameValue !== null ? decodeURIComponent(fileNameValue) : null;

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
  const { getToken } = useCoreAuthStore()

  const url = `${MAIN_API_URL}/${path}${args ? args : ""}`;

  const authHeaders = {
    ...headers,
  };


  if (getToken?.access_token && getToken?.token_type) {
    authHeaders.Authorization = `${getToken.token_type} ${getToken.access_token}`;
  }

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
