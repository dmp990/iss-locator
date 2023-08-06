import axios from "axios";

const URL = "http://api.open-notify.org/iss-now.json";

export const getLocation = () => {
  return axios(URL).then((result) => {
    return result.data.iss_position;
  });
};
