import { styles } from "@/utils/styles";
import { useClerk } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { TbSwitchVertical } from "react-icons/tb";

type Props = {
  user: User | null;
  setOpen: (open: boolean) => void;
  handleProfile: () => void;
  isSellerExist?: boolean;
};

const DropDown = ({ user, setOpen, handleProfile, isSellerExist }: Props) => {
  const { signOut } = useClerk();
  const router = useRouter();
  const handleLogOut = async () => {
    await signOut();
    router.push("/sign-in");
  };
  return (
    <Dropdown aria-placeholder="bottom-start">
      <DropdownTrigger>
        <Avatar
          src={user?.imageUrl}
          alt=""
          className="w-[40px] h-[40px] cursor-pointer"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          onClick={() => {
            handleProfile();
            setOpen(false);
          }}
        >
          <div className="flex w-full items-center">
            <Avatar
              src={user?.imageUrl}
              alt=""
              className="w-[30px] h-[30px] cursor-pointer"
            />
            <span className={`${styles.label} text-black text-[16px] pl-2`}>
              My Profile
            </span>
          </div>
        </DropdownItem>
        <DropdownItem className={`${!isSellerExist && "hidden"}`}>
          <Link href={"/my-shop"} className="flex w-full items-center">
            <TbSwitchVertical className="text-2xl ml-2 text-black" />
            <span className={`${styles.label} text-black text-[16px] pl-2`}>
              Switching to Seller
            </span>
          </Link>
        </DropdownItem>
        <DropdownItem onClick={handleLogOut}>
          <div className="flex items-center w-full">
            <AiOutlineLogout className="text-2xl ml-2 text-black" />
            <span className={`${styles.label} text-black text-[16px] pl-2`}>
              Log out
            </span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDown;
