/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetUsers } from "@/collaborator/hooks/useGetUser";
import { MembersTable } from "@/menbersTable/menbersTable";

const Administrator = () => {
  const { data } = useGetUsers();

  const TABLE_ROWS = data?.map((user: any) => ({
    img: user.profilePicture, // Assuming your API includes a profile picture
    name: user.name,
    email: user.email,
    job: user.job,
    org: user.organization,
    online: user.onlineStatus,
    date: user.dateJoined,
  })) || [];

  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <h1 className="text-2xl mb-4">Administrar Usuario</h1>
        <MembersTable tableRows={TABLE_ROWS} />
      </div>
    </div>
  );
};

export default Administrator;
