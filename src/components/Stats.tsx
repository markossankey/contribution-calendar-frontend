import { AnimatePresence, motion } from "framer-motion";
import { useGetAccount } from "../api/contribution-calendar/hooks";

export const Stats = ({}) => {
  const { isSuccess, data } = useGetAccount();

  const totalContributions =
    data?.accounts?.reduce(
      (totalSum, account) =>
        totalSum + account.contributions.reduce((accountSum, contribution) => contribution.count + accountSum, 0),
      0
    ) ?? 0;
  return (
    <AnimatePresence>
      {isSuccess && (
        <motion.div
          initial={{ height: 0, opacity: 0, overflow: "hidden", margin: 0, padding: 0 }}
          animate={{ height: "fit-content", opacity: 1, overflow: "visible" }}
          exit={{ height: 0, opacity: 0, overflow: "hidden", margin: 0, padding: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <div className="bg-gray-700 rounded-md p-4 text-gray-400">
            <div className="grid grid-cols-3 text-center">
              <div>
                <h4 className="font-bold">Total Contributions</h4>
                <span>{totalContributions}</span>
              </div>
              <div>
                <h4 className="font-bold">Total Accounts</h4>
                <span>{data.accounts.length}</span>
              </div>
              <div>
                <h4 className="font-bold">Avg Daily Contributions</h4>
                <span>{Math.round(totalContributions / 356)}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-700 rounded-md p-4 text-gray-400 ">
            <div className="w-full flex justify-end">
              <button className="px-4 my-2 text-xs py-1 border border-gray-400 rounded-md text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-50 focus:text-gray-50 focus:border-transparent hover:text-gray-50 hover:border-gray-50">
                add
              </button>
            </div>
            {data.accounts.map((account) => (
              <div className="border-t border-t-gray-800 py-4 last:border-b last:border-b-gray-800">
                <div key={account.id} className="grid grid-cols-4 text-center">
                  <div>
                    <h4 className="font-bold">Username</h4>
                    <a
                      href={`https://${account.source}.com/${account.username}`}
                      target="_blank"
                      className="underline underline-offset-2 text-gray-300 hover:text-gray-400"
                    >
                      {account.username}
                    </a>
                  </div>
                  <div>
                    <h4 className="font-bold">Source</h4>
                    <span className="capitalize">{account.source}</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Contributions</h4>
                    <span>{account.contributions.reduce((sum, contribution) => sum + contribution.count, 0)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Avg Daily Contributions</h4>
                    <span>
                      {Math.round(account.contributions.reduce((sum, contribution) => sum + contribution.count, 0) / 356)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
