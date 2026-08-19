"use client";

import {BiometricClient, captureSelfie, startSelfieCamera, stopSelfieCamera} from "@complicatedauth/biometrics";
import {ComplicatedAuthClient} from "@complicatedauth/browser";
import {useMemo, useRef, useState} from "react";

export default function Home() {
  const auth = useMemo(() => new ComplicatedAuthClient({baseUrl: "/api/auth"}), []);
  const biometrics = useMemo(() => new BiometricClient({client: auth}), [auth]);
  const video = useRef<HTMLVideoElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Start with an email address.");

  const run = (operation: () => Promise<unknown>, success: string) => async () => {
    try { await operation(); setStatus(success); }
    catch (error) { setStatus(error instanceof Error ? error.message : "Authentication failed"); }
  };

  const face = async (enroll: boolean) => {
    if (!video.current) return;
    const stream = await startSelfieCamera(video.current);
    try {
      const image = await captureSelfie(video.current);
      if (enroll) await biometrics.startBiometricEnrollment(image);
      else await biometrics.startBiometricAuth(image);
      setStatus(enroll ? "Face enrolled." : "Authenticated with password and face.");
    } finally { stopSelfieCamera(stream); }
  };

  return <main>
    <h1>ComplicatedAuth Next.js example</h1>
    <p>{status}</p>
    <p><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" /> <button onClick={run(() => auth.startLogin(email), "Login attempt started.")}>Start login</button></p>
    <p><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" /> <button onClick={run(() => auth.startPasswordAuth(password), "Password verified; choose passkey, hybrid, or face.")}>Verify password</button></p>
    <p>
      <button onClick={run(() => auth.startPasskeyAuth(), "Authenticated with password and passkey.")}>Passkey</button>{" "}
      <button onClick={run(() => auth.startSecurityKeyAuth(), "Authenticated with password and an attested security key.")}>Security key</button>{" "}
      <button onClick={run(() => auth.startHybridAuth(), "Authenticated with password and hybrid passkey.")}>Hybrid</button>
    </p>
    <video ref={video} style={{width: 320, background: "#eee"}} />
    <p><button onClick={() => void face(false)}>Password + face</button> <button onClick={() => void face(true)}>Enroll face</button></p>
    <p><button onClick={run(() => auth.startPasskeyEnrollment(), "Passkey enrolled.")}>Enroll passkey</button> <button onClick={run(() => auth.startSecurityKeyEnrollment(), "Security key enrolled.")}>Enroll security key</button></p>
    <button onClick={run(() => auth.logout(), "Logged out.")}>Log out</button>
  </main>;
}
