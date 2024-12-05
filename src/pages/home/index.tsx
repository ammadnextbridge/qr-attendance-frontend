import { Helmet } from "react-helmet-async";

import { CONFIG } from "@/config-global";
import HomeView from "@/sections/home/view/home-view";

// ----------------------------------------------------------------------

const metadata = { title: `Home - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <HomeView />
    </>
  );
}
