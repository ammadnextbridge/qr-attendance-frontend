import { Helmet } from "react-helmet-async";

import { CONFIG } from "@/config-global";
import SignInView from "@/auth/view/sign-in-view";

// ----------------------------------------------------------------------

const metadata = { title: `Sign in | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SignInView />
    </>
  );
}
