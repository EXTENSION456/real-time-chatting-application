import React from "react";
import Logo from "../../../../components/container/Logo";
import { Title } from "../../../../components/container/Title";
import ProfileInfo from "./components/profile-info";
import NewDm from "./components/new-dm";
import { useContact } from "@/context/ContactContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const ContactsContainer = () => {
  const { contacts, setSelectedContact } = useContact();

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full h-full">
      <div className="pt-2">
        <Logo />
      </div>
      <div className="my-4">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDm />
        </div>
      </div>

      <div className="my-4 pl-8">
        <div className="flex flex-col gap-5">
          {contacts.map((contact) => {
            return (
              <div
                key={contact._id}
                className="flex gap-3 items-center cursor-pointer"
                onClick={() => setSelectedContact(contact)}
              >
                <div className="w-12 h-12 relative ">
                  <Avatar className="h-12 w-12 rounded-full overflow-hidden border-4 border-[#ff006e]">
                    {contact?.image ? (
                      <AvatarImage
                        src={contact.imageUrl}
                        alt="profile"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-white text-2xl bg-[#712c4a57]">
                        {contact?.email?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                  </Avatar>
                </div>
                <div className="flex flex-col ">
                  <span>
                    {contact?.firstName && contact?.lastName
                      ? `${contact.firstName} ${contact.lastName}`
                      : ""}{" "}
                  </span>
                  {/* <span className="text-xs">{contact.email}</span> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="my-4">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>

      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;
