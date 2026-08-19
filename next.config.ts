import type {NextConfig} from "next";
import path from "node:path";
import {fileURLToPath} from "node:url";

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config: NextConfig = {
  transpilePackages: ["@complicatedauth/browser", "@complicatedauth/biometrics", "@complicatedauth/server"],
  turbopack: {root: workspaceRoot},
};
export default config;
