import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-server";

export async function GET() {
  const sb = getServiceSupabase();
  if (!sb) {
    return NextResponse.json({ seats: [] as { row: string; seat: number; status: string }[] });
  }

  const { data, error } = await sb
    .from("bookings")
    .select("row_letter, seat_number, status")
    .in("status", ["pending", "issued"]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const seats =
    data?.map((r) => ({
      row: r.row_letter as string,
      seat: r.seat_number as number,
      status: r.status as string,
    })) ?? [];

  return NextResponse.json({ seats });
}
