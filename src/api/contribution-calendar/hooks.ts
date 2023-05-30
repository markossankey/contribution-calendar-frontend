import { useQuery } from "@tanstack/react-query";
import ContributionApi from ".";
import { useGlobalState } from "../../context/GlobalState";

export const useGetAllAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: ContributionApi.getAllAcounts,
  });
};

export const useGetAccount = () => {
  const { visibleUser } = useGlobalState();
  return useQuery({
    queryKey: ["account", visibleUser],
    queryFn: () => ContributionApi.getAccount(visibleUser),
  });
};
