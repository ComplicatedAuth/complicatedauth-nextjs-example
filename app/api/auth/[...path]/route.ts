import {getComplicatedAuth} from "@/lib/auth-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = (request: Request) => getComplicatedAuth().handle(request);
export const POST = (request: Request) => getComplicatedAuth().handle(request);
export const DELETE = (request: Request) => getComplicatedAuth().handle(request);
