import { create } from "zustand";
import request from "../server/request";
import Cookies from "js-cookie";

interface UserState {
  user: object;
  skills: object;
  userSkills: object;
  userWithId: object;
  getUser: () => void;
}

const useGetUser = create<UserState>()((set) => ({
  user: {},
  skills: [],
  userWithId: {},
  userSkills: [],
  getUser: async () => {
    await request
      .get("api/v1/auth/me", {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
      .then((res) => set({ user: res.data }))
      .catch((err) => console.log(err));
  },
  getUserWithId: async (id: string) => {
    await request
      .get(`api/v1/users/${id}`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
      .then((res) => set({ userWithId: res.data }))
      .catch((err) => console.log(err));
  },
  getSkills: async (id: string) => {
    await request
      .get(`api/v1/skills`, {
        user: id,
      })
      .then((res) => set({ skills: res.data.data }));
  },
  getUserSkills: async (id: string) => {
    await request
      .get(`api/v1/skills`, {
        params: {
          user: id,
          limit: 1000,
          page: 1,
        },
      })
      .then((res) => set({ userSkills: res.data.data }));
  },
}));

export default useGetUser;
