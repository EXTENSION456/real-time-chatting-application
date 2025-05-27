import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { animationDefaultOptions } from "@/lib/utils";
import Lottie from "react-lottie";
import { handleSearch } from "@/services/contact";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useContact } from "@/context/ContactContext";

const ContactDialog = ({ openNewContactModel, setOpenNewContactModel }) => {
  const [searchContact, setSearchContact] = useState([]);

  const { selectedContact, setSelectedContact } = useContact();

  const findContact = async (searchTerm) => {
    try {
      const response = await handleSearch(searchTerm);
      if (response.contacts) {
        setSearchContact(response.contacts);
      } else {
        setSearchContact([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectNewContact = (contact) => {
    setSelectedContact(contact);
    setOpenNewContactModel(false);
    setSearchContact([]);
  };

  return (
    <>
      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none "
              onChange={(e) => findContact(e.target.value)}
            />
          </div>

          {searchContact.length > 0 && (
            <>
              <ScrollArea className="h-[250px]">
                <div className="flex flex-col gap-5">
                  {searchContact.map((contact) => {
                    return (
                      <div
                        key={contact._id}
                        className="flex gap-3 items-center cursor-pointer"
                        onClick={() => selectNewContact(contact)}
                      >
                        <div className="w-12 h-12 relative ">
                          <Avatar className="h-12 w-12 rounded-full overflow-hidden border-4 border-[#ff006e]">
                            {contact?.image ? (
                              <AvatarImage
                                // src={imageUrl}
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
                          <span className="text-xs">{contact.email}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </>
          )}

          {searchContact.length <= 0 && (
            <>
              <div className="flex-1 mt-5 md:mt-0 md:flex flex-col justify-center items-center duration-1000 transition-all">
                <Lottie
                  isClickToPauseDisabled={true}
                  height={100}
                  width={100}
                  options={animationDefaultOptions}
                />
                <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center">
                  <h3 className="poppins-medium">
                    Hi <span className="text-purple-500 ">!</span> Search new{" "}
                    <span className="text-purple-500 ">Contact</span>
                  </h3>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactDialog;
