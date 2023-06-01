import dayjs from "dayjs";
import { useMemo } from "react";
import { useGetAccount } from "../api/contribution-calendar/hooks";
import { Tooltip } from "./Tooltip";

export const Calendar = ({}) => {
  const { isLoading, isError, data } = useGetAccount();
  const days = useMemo(() => getDaysInLastYear(), []);

  if (isLoading) return <PlaceHolderCalendar days={days} />;
  if (isError) return <ErrorCalendar days={days} />;
  let contributionsObj = {} as ContributionsObj;
  let accounts: any[] = [];
  let largestContribution = 0;
  data.accounts.forEach(({ contributions, source, username }) => {
    accounts.push({ source, username });
    contributions.forEach(({ count, date: unformattedDate }) => {
      let date = dayjs(unformattedDate).add(1, "day").format("M-D-YY");
      if (!contributionsObj[date]) contributionsObj[date] = { date, total: 0, byAccount: [] };
      if (count === 0) return;
      contributionsObj[date] = {
        date,
        total: contributionsObj[date]?.total + count || count,
        byAccount: [...contributionsObj[date]?.byAccount, { count, source, username }],
      };
      if (contributionsObj[date].total > largestContribution) largestContribution = contributionsObj[date].total;
    });
  });
  const dailyContributions = days.map(
    (day) => contributionsObj[day.format("M-D-YY")] || { date: day.format("M-D-YY"), total: 0, byAccount: [] }
  );
  return (
    <div className="grid grid-rows-7 grid-cols-53 border border-solid rounded-md border-gray-400 w-fit  grid-flow-col p-4 gap-1 drop-shadow-lg">
      {dailyContributions.map((dailyContribution) => (
        <ContributionDay
          key={dailyContribution.date}
          largestContribution={largestContribution}
          dailyContribution={dailyContribution}
        />
      ))}
    </div>
  );
};

const getDaysInLastYear = () => {
  const today = dayjs();
  const oneYearAgo = today.subtract(1, "year");

  // start on sunday of atleast one year ago
  let runningDay = oneYearAgo.startOf("week");
  const days = [];

  while (!runningDay.isAfter(today, "day")) {
    days.push(runningDay);
    runningDay = runningDay.add(1, "day");
  }

  return days;
};

type ContributionDayProps = {
  largestContribution: number;
  dailyContribution: ContributionsObj[keyof ContributionsObj] | null;
};
const ContributionDay = ({ largestContribution, dailyContribution }: ContributionDayProps) => {
  if (!dailyContribution || dailyContribution.total === 0)
    return <div className="row-span-1 col-span-1 w-3 h-3 bg-blue-50 rounded-sm" style={{ opacity: 0.03 }} />;

  const opacity = dailyContribution.total / (largestContribution * 0.5);

  return (
    <Tooltip
      content={
        <div className="whitespace-nowrap w-fit">
          <div className="font-bold mb-2">{dailyContribution.date}</div>
          <table className="border-separate border-spacing-x-3 text-center">
            <thead>
              <tr>
                <th className="text-xs font-bold">Total</th>
                <th className="text-xs font-bold">Source</th>
                <th className="text-xs font-bold">Username</th>
              </tr>
            </thead>
            <tbody>
              {dailyContribution.byAccount.map(({ count, source, username }) => (
                <tr key={source}>
                  <td className="text-xs">{count}</td>
                  <td className="text-xs">{source}</td>
                  <td className="text-xs">{username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    >
      <div
        className="row-span-1 col-span-1 w-3 h-3 bg-gray-300 rounded-sm"
        style={{ opacity }} // todo: make this relative to the max
        onClick={() => console.log(dailyContribution)}
      />
    </Tooltip>
  );
};

export interface ContributionsObj {
  [key: string]: {
    date: string;
    total: number;

    byAccount: {
      source: string;
      username: string;
      count: number;
    }[];
  };
}

const PlaceHolderCalendar = ({ days }: { days: any[] }) => {
  return (
    <div className="grid grid-rows-7 grid-cols-53 border border-solid rounded-md text-gray-400  w-fit mx-auto grid-flow-col p-4 gap-1 drop-shadow-lg">
      {days.map((_, i) => (
        <div
          key={i}
          className="row-span-1 col-span-1 w-3 h-3 bg-blue-50 rounded-sm animate-pulse opacity-30"
          style={{ animationDelay: `${Math.floor(Math.random() * days.length) * 7}ms` }}
        />
      ))}
    </div>
  );
};

const ErrorCalendar = ({ days }: { days: any[] }) => {
  return (
    <div className="grid grid-rows-7 grid-cols-53 border border-solid rounded-md text-gray-400  w-fit mx-auto grid-flow-col p-4 gap-1 drop-shadow-lg">
      {days.map((_, i) => (
        <div
          key={i}
          className="row-span-1 col-span-1 w-3 h-3 bg-red-500 rounded-sm animate-pulse opacity-30"
          style={{ animationDelay: `${Math.floor(Math.random() * days.length) * 7}ms` }}
        />
      ))}
    </div>
  );
};
