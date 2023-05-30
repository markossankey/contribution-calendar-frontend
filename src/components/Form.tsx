import { SyntheticEvent } from "react";
import { useGetAccount } from "../api/contribution-calendar/hooks";
import { useGlobalState } from "../context/GlobalState";

export const Form = ({}) => {
  const { setVisibleUser } = useGlobalState();
  const { isError, isLoading } = useGetAccount();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & FormInputs;
    const username = target.username.value;
    setVisibleUser(username);
  };

  return (
    <form className="text-gray-50 flex justify-between items-end" onSubmit={handleSubmit}>
      <div className="h-fit flex items-end">
        <label htmlFor="username" className="mr-2 text-gray-400 focus-within:text-gray-50 ">
          Username
          <input
            id="username"
            name="username"
            type="text"
            className="ml-2 rounded-md bg-gray-800 border border-gray-400 px-2 focus:outline-none focus:ring-1 focus:ring-gray-50 focus:border-transparent"
          />
        </label>
      </div>
      {isError && (
        <div className="h-fit flex items-end">
          <label htmlFor="email" className="mr-2 text-gray-400 focus-within:text-gray-50 ">
            Email
            <input
              id="email"
              name="email"
              type="text"
              className="ml-2 rounded-md bg-gray-800 border border-gray-400 px-2 focus:outline-none focus:ring-1 focus:ring-gray-50 focus:border-transparent"
            />
          </label>
        </div>
      )}
      <button
        type="submit"
        className="px-4 mt-0 mb-auto text-xs py-1 border border-gray-400 rounded-md text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-50 focus:text-gray-50 focus:border-transparent hover:text-gray-50 hover:border-gray-50"
      >
        {isError ? "Create" : "Search"}
        {isLoading && (
          <span className="inline-block align-middle ml-2">
            <Spinner />
          </span>
        )}
      </button>
    </form>
  );
};

type FormInputs = {
  username: { value: string };
};

const Spinner = () => (
  <svg className="animate-spin  h-4 w-4 text-gray-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
