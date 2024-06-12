import { getBlockedUsers } from "@/lib/blockService";
import { DataTable } from "./_components/DataTable";
import { format } from "date-fns";
import { columns } from "./_components/columns";

export default async function Page() {
    const blockedUsers = await getBlockedUsers();
    const formattedData =
        blockedUsers?.map((block) => {
            return {
                ...block,
                userId: block.blocked.id,
                imageUrl: block.blocked.imageUrl,
                username: block.blocked.username,
                createdAt: format(
                    new Date(block.blocked.createdAt),
                    "dd/MM/yyyy"
                ),
            };
        }) || [];

    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="font-bold text-2xl">Community Settings</h1>
            </div>
            <DataTable columns={columns} data={formattedData} />
        </div>
    );
}
