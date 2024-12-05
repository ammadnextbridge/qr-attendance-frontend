import { Helmet } from "react-helmet-async";

import { CONFIG } from "@/config-global";

import QRCodeView from "@/sections/qr-code/view/qr-code-view";

// ----------------------------------------------------------------------

const metadata = { title: `Scan - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <QRCodeView />
    </>
  );
}
