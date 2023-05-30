import axios from "axios";
import { getAccountSchema, getAllAccountsSchema } from "./schema";

const { get, post, put, delete: destory } = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

const ContributionApi = {
  getAllAcounts: async () => {
    const { data } = await get("/user");
    return getAllAccountsSchema.parse(data);
  },

  getAccount: async (globalUsername: string) => {
    const { data } = await get(`/user/${globalUsername}`);
    return getAccountSchema.parse(data);
  },
};

export default ContributionApi;
