import { formatDistanceToNow } from "date-fns";
import { FaBookOpen, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";

const RepoCard = ({ repo }) => {
  const updatedAt = repo.updated_at
    ? formatDistanceToNow(new Date(repo.updated_at), {
        addSuffix: true,
      })
    : "Unknown";

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-primary">
            <FaBookOpen className="shrink-0" />
            <h2 className="wrap-break-words text-lg font-semibold">
              {repo.name}
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            by {repo.owner?.login ?? "Unknown owner"}
          </p>
        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${repo.full_name} on GitHub`}
          className="shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary">
          <FaExternalLinkAlt />
        </a>
      </div>

      <p className="text-sm leading-6 text-gray-600">
        {repo.description || "No description provided."}
      </p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-600">
        {repo.language && (
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-primary" />
            {repo.language}
          </span>
        )}

        <span className="flex items-center gap-2">
          <FaStar />
          {repo.stargazers_count.toLocaleString()}
        </span>

        <span className="flex items-center gap-2">
          <FaCodeFork />
          {repo.forks_count.toLocaleString()}
        </span>
      </div>

      <p className="border-t border-gray-100 pt-3 text-xs text-gray-500">
        Updated {updatedAt}
      </p>
    </div>
  );
};

export default RepoCard;
