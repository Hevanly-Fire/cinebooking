import {NextResponse} from "next/server";

export async function GET(req: Request, res: NextResponse) {
  return NextResponse.json({message: "no auth"});
}

export const runtime = "nodejs";

