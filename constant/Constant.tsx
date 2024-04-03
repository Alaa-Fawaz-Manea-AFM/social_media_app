import { FaHome } from "react-icons/fa";
import { IoImages } from "react-icons/io5";
import { HiSaveAs } from "react-icons/hi";
import { MdPeopleAlt } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import { Posts_Icon, Like_Icon } from "@/public/assets";

const navLink = [
  { icon: <FaHome size={30} />, name: "Home", cat: "" },
  { icon: <IoImages size={30} />, name: "Explore", cat: "explore" },
  { icon: <MdPeopleAlt size={32} />, name: "People", cat: "people" },
  { icon: <HiSaveAs size={35} />, name: "Saved", cat: "saved" },
  {
    icon: <LuImagePlus size={30} />,
    name: "Create-Post",
    cat: "create-post",
  },
];

const EditProfileInput = [
  { label: "Name", name: "name", type: "text" },
  { label: "UserName", name: "userName", type: "text" },
  { label: "Bio", name: "bio", text: true },
  { label: "Email", name: "email", type: "email" },
];

const userBtnPostORLiked = [
  // { name: "Posts", img: Posts_Icon },
  { name: "Liked", img: Like_Icon },
];

export { navLink, userBtnPostORLiked, EditProfileInput };
