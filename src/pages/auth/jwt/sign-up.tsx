import { Helmet } from "react-helmet-async";

import { CONFIG } from "@/config-global";

import { SignUpView } from "@/auth/view";

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SignUpView />
    </>
  );
}
