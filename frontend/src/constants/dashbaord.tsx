import { MessageSquareMore, Settings2Icon, Users } from "lucide-react";

export const data = {
  sidebarUser: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  sidebarItems: [
    {
      title: "Interviews",
      url: "#",
      icon: (
        <MessageSquareMore
        />
      ),
      isActive: true,
    },
        {
      title: "Candidates",
      url: "#",
      icon: (
        <Users
        />
      ),
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
    },
  ],
}