import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/AuthContext";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import { handleLogout } from "@/services/auth";

const ProfileInfo = () => {
  const [imageUrl, setImageUrl] = useState(true);
  const { userInfo, setUserInfo } = useUser();
  const navigate = useNavigate();

  const logOut = async () => {
    navigate("/auth");
    try {
      setUserInfo(undefined);
      await handleLogout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33] ">
      <div className="flex gap-3 items-center justify-center ">
        <div className="w-12 h-12 relative ">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden border-4 border-[#ff006e]">
            {imageUrl ? (
              <AvatarImage
                // src={imageUrl}
                alt="profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-white text-2xl bg-[#712c4a57]">
                {userInfo?.email?.[0]?.toUpperCase() || "?"}
              </div>
            )}
          </Avatar>
        </div>

        <div className="">
          {userInfo?.firstName && userInfo?.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}{" "}
        </div>
      </div>

      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className="text-purple-500 text-xl font-medium cursor-pointer"
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white ">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                className="text-purple-500 text-xl font-medium cursor-pointer"
                onClick={logOut}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white ">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
