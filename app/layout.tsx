import type {ReactNode} from "react";

export default function RootLayout({children}: {children: ReactNode}) {
  return <html lang="en"><body style={{fontFamily: "system-ui", maxWidth: 640, margin: "4rem auto"}}>{children}</body></html>;
}
