import {ComplicatedAuthServer} from "@complicatedauth/server";

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
};

let complicatedAuth: ComplicatedAuthServer | undefined;

/** Read secrets only when the dynamic route receives a request, never during `next build`. */
export const getComplicatedAuth = (): ComplicatedAuthServer => {
  complicatedAuth ??= new ComplicatedAuthServer({
    backendUrl: required("COMPLICATEDAUTH_URL"),
    projectUid: required("COMPLICATEDAUTH_PROJECT_UID"),
    apiKey: required("COMPLICATEDAUTH_API_KEY"),
    // Replace the development MemoryReferenceStore with RedisReferenceStore in production.
  });
  return complicatedAuth;
};
