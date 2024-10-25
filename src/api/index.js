import axios from "axios";

export const BASE_URL = "https://api.cagir.az/api";

export const applyCreate = ({ applyType, onSuccess }) => {
  axios
    .post(
      `${BASE_URL}/apply/create`,
      {
        applyType: applyType,
      },
      { headers: { "Accept-Language": "az" } }
    )
    .then((response) => {
      onSuccess(response.data.result);
    })
    .catch((error) => {
      console.error(error);
    });
};
