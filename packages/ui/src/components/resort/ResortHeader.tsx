import { GetResortByNameWithMembersQuery } from "@oasis-sh/client-gql";
import React from "react";

type ResortData = GetResortByNameWithMembersQuery["getResortByName"];

interface Props {
  resortData: ResortData | undefined | null;
  joinResort: () => void;
}

export const ResortHeader: React.FC<Props> = () => {
  return (
    <>
      <div
        className={`bg-resortSecondary transition-opacity hover:opacity-80 p-20 shadow-2xl max-w-xl rounded-2xl`}
      >
        something
      </div>
    </>
  );
};
