/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios from "axios";

export const normalFetchHooks = async (
  fetchURL?: string,
  token?: string,
  additionalFunction?: () => void,
  additionalFunction2?: () => void
) => {
  try {
    const data = await axios.post(fetchURL as string, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const json = data?.data;
    if (json?.status === "FAILURE") {
      console.log(json?.message);
    } else if (json?.status === "SUCCESS") {
      additionalFunction;
      additionalFunction2;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(
        "There is some Internal Server Error. Please Contact to our staff member."
      );
    }
  }
};

export default normalFetchHooks;
