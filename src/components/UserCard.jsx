import { format } from "date-fns";
import { FaGithub, FaRegBuilding } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { GoRepo } from "react-icons/go";
import { IoIosLink, IoMdPeople } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";

const UserCard = ({ userData }) => {
  return (
    <div className="flex  flex-col md:flex-row bg-white w-full gap-10 rounded-lg p-4 ">
      <img
        src={userData.avatar_url}
        className="w-28 h-28 rounded-full"
        alt={`${userData.login}'s avatar`}
      />
      <div className="space-y-3 w-full sm:me-10">
        <p className="font-bold text-2xl">{userData.name}</p>
        <div className="flex space-x-6">
          <p className="font-bold text-sm">@{userData.login}</p>
          <div className="bg-blue-200 px-3 py-1 rounded-full">
            <p className="text-blue-800 text-xs"> {userData.type}</p>
          </div>
        </div>
        {userData.bio && <p className=" text-gray-600">{userData.bio}</p>}
        <div className="flex mt-4 space-x-10 justify-between">
          <div className="flex gap-4">
            <GoRepo className="w-6 h-6 mt-1" />
            <div>
              <p className="font-bold text-xl">{userData.public_repos}</p>
              <p className="text-xs text-gray-600">Public Repo</p>
            </div>
          </div>
          <div className="flex gap-4">
            <IoMdPeople className="w-6 h-6 mt-1" />
            <div>
              <p className="font-bold text-xl">{userData.followers}</p>
              <p className="text-xs text-gray-600">Followers</p>
            </div>
          </div>
          <div className="flex gap-4">
            <IoMdPeople className="w-6 h-6 mt-1" />
            <div>
              <p className="font-bold text-xl">{userData.following}</p>
              <p className="text-xs text-gray-600">Following</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex justify-end">
          <a
            href={userData.html_url}
            className="bg-primary px-4 flex text-white space-x-2 py-2  items-center  rounded-full">
            <FaGithub className="w-6 h-6" />
            <p className="mt-1">View GitHub Profile</p>
            <FiExternalLink className="w-6 h-6" />
          </a>
        </div>
        <div className="border-s-2  border-gray-100 ps-4 mt-6 space-y-4">
          {userData.location && (
            <div className="flex gap-4">
              <IoLocationOutline className="w-6 h-6" />
              <p className=" text-gray-600">{userData.location}</p>
            </div>
          )}
          {userData.company && (
            <div className="flex items-center gap-4">
              <FaRegBuilding className="w-6 h-6" />
              <p className=" text-gray-600">{userData.company}</p>
            </div>
          )}
          {userData.blog && (
            <div className="flex items-center gap-4">
              <IoIosLink className="w-6 h-6" />
              <a
                href={
                  userData.blog.startsWith("http://") ||
                  userData.blog.startsWith("https://")
                    ? userData.blog
                    : `https://${userData.blog}`
                }
                className="text-blue-600">
                {userData.blog}
              </a>
            </div>
          )}
          <div className="flex items-center gap-4">
            <MdDateRange className="w-6 h-6" />
            <p className=" text-gray-600">
              Joined on {format(new Date(userData.created_at), "MMM d , yyyy")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
