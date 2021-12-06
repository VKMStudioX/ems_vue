export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("userInfo"));

  if (user && user.token) {
    return {
      Authorization: "Bearer " + user.token,
      Accept: "application/json",
    };
  }
}
