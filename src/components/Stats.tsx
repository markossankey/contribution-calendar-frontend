import { useGetAccount } from "../api/contribution-calendar/hooks";

export const Stats = ({}) => {
  const { isLoading, isError, data } = useGetAccount();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const totalContributions = data.accounts.reduce(
    (totalSum, account) =>
      totalSum + account.contributions.reduce((accountSum, contribution) => contribution.count + accountSum, 0),
    0
  );
  return (
    <div className="flex flex-col gap-8 my-8">
      <div>
        <div className="mb-4">
          <h3 className="text-2xl font-bold border-b border-b-gray-400">Summary</h3>
        </div>
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
      <div>
        <div className="">
          <h3 className="text-2xl font-bold border-b border-b-gray-400">By Account</h3>
        </div>
        {data.accounts.map((account) => (
          <div className="border-b border-b-gray-700 py-4">
            <h5 className="capitalize text-xl font-bold text-center mb-4">{account.source}</h5>
            <div key={account.id} className="grid grid-cols-3 text-center">
              <div>
                <h4 className="font-bold">Contributions</h4>
                <span>{account.contributions.reduce((sum, contribution) => sum + contribution.count, 0)}</span>
              </div>
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
                <h4 className="font-bold">Avg Daily Contributions</h4>
                <span>
                  {Math.round(account.contributions.reduce((sum, contribution) => sum + contribution.count, 0) / 356)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
