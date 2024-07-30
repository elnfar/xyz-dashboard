
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function useWorkspace() {
  let { slug } = useParams() as { slug: string | null };
  const searchParams = useSearchParams();
  if (!slug) {
    slug = searchParams.get("slug");
  }

  const {
    data: workspace,
    error,
    mutate,
  } = useSWR(slug && `/api/workspaces/${slug}`, {
    dedupingInterval: 60000,
  });

  return {
    ...workspace,
    role: (workspace?.users && workspace.users[0].role) || "member",
    isOwner: workspace?.users && workspace.users[0].role === "owner",
    exceededClicks: workspace && workspace.usage >= workspace.usageLimit,
    exceededLinks: workspace && workspace.linksUsage >= workspace.linksLimit,
    exceededAI: workspace && workspace.aiUsage >= workspace.aiLimit,
    exceededDomains:
      workspace?.domains && workspace.domains.length >= workspace.domainsLimit,
    error,
    mutate,
    loading: slug && !workspace && !error ? true : false,
  };
}
