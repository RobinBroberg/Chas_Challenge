import React from "react";

const ProfileCard = ({
  title = "Profil",
  user,
  underlineWidth = "w-[215px]",
}) => {
  return (
    <div className="bg-white/75 p-6 pt-4 rounded-xl shadow items-center text-left border border-white flex flex-col md:h-[720px]">
      <div className="w-full h-full flex flex-col justify-start">
        <div className="w-full flex justify-between items-start mt-1 mb-6">
          <p
            className={`font-semibold text-2xl text-black relative inline-block after:block after:h-[1px] after:bg-black after:${underlineWidth} after:mt-1`}
          >
            {title}
          </p>
          {user.team && (
            <p className="font-bold text-xs text-black">{user.team}</p>
          )}
        </div>

        <div className="flex justify-center mt-10">
          <img
            src={user.avatar}
            alt="Avatar"
            className="rounded-full w-45 h-45 md:w-55 md:h-55 object-cover border-2 border-[#5F6F52] shadow-md"
          />
        </div>

        <div className="mt-8 space-y-6 text-black font-light text-base">
          <div className="border-b font-medium border-black pt-2 pb-3 mb-8">
            {user.first_name} {user.last_name}
          </div>
          <div className="border-b border-black pt-2 pb-3 mb-8">
            {user.email}
          </div>
          <div className="border-b border-black pt-2 pb-3 mb-8">
            {user.department}
          </div>
          <div className="border-b border-black pt-2 pb-3 mb-8">
            {user.company}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
