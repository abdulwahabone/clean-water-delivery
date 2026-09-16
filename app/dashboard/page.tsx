import { db } from "@/db";
import { deliveries } from "@/db/schema";

export default async function DashboardPage() {
  const rows = await db.select().from(deliveries);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#12323f]">
        Today’s deliveries
      </h1>
      <p className="mt-1 text-sm text-[#5b7480]">
        Seeded practice data for the water drop board.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#d7e8ee] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f3fafc] text-[#5b7480]">
            <tr>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Address</th>
              <th className="px-4 py-3 font-medium">Bottles</th>
              <th className="px-4 py-3 font-medium">Window</th>
              <th className="px-4 py-3 font-medium">Driver</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[#e7f1f4]">
                <td className="px-4 py-3 font-medium text-[#12323f]">
                  {row.customer}
                </td>
                <td className="px-4 py-3 text-[#5b7480]">{row.address}</td>
                <td className="px-4 py-3">{row.bottles}</td>
                <td className="px-4 py-3">{row.window}</td>
                <td className="px-4 py-3">{row.driver}</td>
                <td className="px-4 py-3">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
