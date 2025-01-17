import { check } from "k6";
import http from "k6/http";

export const options = {
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(99)<1000"], // 99% of requests should be below 1s
  },
};

export default function () {
  const url = "http://192.168.31.205:1337/v1/graphql";
  const payload = JSON.stringify({
    query: "query MyQuery {\n  __typename ## Placeholder value\n}\n",
    operationName: "MyQuery",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // send a post request and save response as a variable
  const res = http.post(url, payload, params);

  // check that response is 200
  check(res, {
    "response code was 200": (res) => res.status == 200,
  });
}
