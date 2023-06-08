import { NextResponse } from "next/server";

export const revalidate = 3600;

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") ?? "3") - 1;
};
