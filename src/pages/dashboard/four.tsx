import { Helmet } from "react-helmet-async";

import { CONFIG } from "@/config-global";

// ----------------------------------------------------------------------

const metadata = { title: `Page four | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
    </>
  );
}
