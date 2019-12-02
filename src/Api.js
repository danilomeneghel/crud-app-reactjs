import React from "react";
import { useGet } from "restful-react";

const Api = () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/users';
  const { data: users } = useGet({
    path: apiUrl
  });

console.log(users);

  return (users);
};

export default Api;
