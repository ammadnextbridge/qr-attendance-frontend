import { Helmet } from "react-helmet-async";

import { CONFIG } from "@/config-global";

import UserListView from "@/sections/user/views/user-list-view";

// ----------------------------------------------------------------------

const metadata = { title: `Users - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserListView />
    </>
  );
}
