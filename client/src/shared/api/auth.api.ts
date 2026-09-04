import { authApi, baseApi } from "@/root/api/api";
import { IUser } from "@/root/types/user.type";
import { useMutation, useQuery } from "react-query";

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["registerUser"],
    mutationFn: (userData: Pick<IUser, "email" | "password">) =>
      baseApi
        .post<IUser & { accessToken: string }>("auth/register", userData)
        .then(({ data }) => data),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      window.location.reload();
    },
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationKey: ["loginUser"],
    mutationFn: (userData: Pick<IUser, "email" | "password">) =>
      baseApi
        .post<IUser & { accessToken: string }>("auth/login", userData)
        .then(({ data }) => data),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      window.location.reload();
    },
  });
};

export const useGetProfileUser = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  console.log(token);

  return useQuery({
    queryKey: ["getProfileUser"],
    queryFn: () => authApi.get<IUser>("auth/profile").then(({ data }) => data),
    enabled: !!token,
  });
};

export const useLogoutUser = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authApi.get("auth/logout"),
    onSuccess: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        window.location.pathname = "/";
      }
    },
  });
};
