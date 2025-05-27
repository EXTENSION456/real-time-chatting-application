import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { handleUpdateProfile } from "@/services/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const Profile = () => {
  const { userInfo } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [hovered, setHovered] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const image = URL.createObjectURL(file);
      setImageUrl(image);
    }
    console.log(file);
  };

  const onSubmit = async (data) => {
    console.log(data);
    const toastId = toast.loading("Updating...");
    try {
      const response = await handleUpdateProfile(data);
      if (response.success) {
        toast.success("Updated Successfully", { id: toastId });
        setTimeout(() => {
          navigate("/chat");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.msg, { id: toastId });
    }
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please setup your profile...");
    }
  };

  // const uploadPhoto = () => {};

  return (
    <div className="min-h-screen bg-[#1b1c24] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-2"
      >
        {/* Left: Form Card */}
        <Card className="bg-[#21232d] text-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex gap-4 items-center text-xl">
              <div onClick={handleNavigate} className="cursor-pointer">
                <IoArrowBack />
              </div>
              <p>Edit Profile</p>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                {...register("email", { required: "Email is required" })}
                placeholder="you@example.com"
                className="bg-[#2a2c3b] text-white"
                defaultValue={userInfo?.email}
              />
              {errors?.email && (
                <p className="text-red-500 text-sm">{errors?.email?.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <Label htmlFor="firstName" className="text-white">
                First Name
              </Label>
              <Input
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="John"
                className="bg-[#2a2c3b] text-white"
                defaultValue={userInfo?.firstName}
              />
              {errors?.firstName && (
                <p className="text-red-500 text-sm">
                  {errors?.firstName?.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <Label htmlFor="lastName" className="text-white">
                Last Name
              </Label>
              <Input
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Doe"
                className="bg-[#2a2c3b] text-white"
                defaultValue={userInfo?.lastName}
              />
              {errors?.lastName && (
                <p className="text-red-500 text-sm">
                  {errors?.lastName?.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-[#ff006e] hover:bg-[#d9005f] w-full cursor-pointer"
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Right: Image Upload */}
        <div className="flex flex-col items-center justify-center gap-4 relative">
          <div
            className="relative group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-48 w-48 rounded-full overflow-hidden border-4 border-[#ff006e]">
              {imageUrl ? (
                <AvatarImage
                  src={imageUrl}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-white text-2xl bg-[#712c4a57]">
                  {userInfo?.email?.[0]?.toUpperCase() || "?"}
                </div>
              )}
            </Avatar>

            {hovered &&
              (imageUrl ? (
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full"
                >
                  <FaTrash className="text-white text-2xl cursor-pointer" />
                </button>
              ) : (
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer">
                  <input
                    type="file"
                    {...register("profileImage")}
                    className="hidden"
                    accept="image/*"
                    onChange={onImageChange}
                  />
                  <FaPlus className="text-white text-2xl cursor-pointer" />
                </label>
              ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
