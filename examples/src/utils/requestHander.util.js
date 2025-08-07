import { isBrowser } from "./LocalStorage.util";

const requestHandler = async (api, setLoading, onSuccess, onError) => {
  setLoading && setLoading(true);
  try {
    const response = await api();
    const { data } = response;
    if (data?.success) {
      onSuccess(data);
    }
  } catch (error) {
    if ([401, 403].includes(error?.response.data?.statusCode)) {
      localStorage.clear();
      if (isBrowser) window.location.href = "/login";
    }
    onError(error?.response?.data?.message || "Something went wrong");
  } finally {
    setLoading && setLoading(false);
  }
};

export {requestHandler}
