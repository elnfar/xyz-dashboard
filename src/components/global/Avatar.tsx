import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
 
export function UserProfile({userSrc}:{userSrc?:string}) {
  return (
    <Avatar>
      <AvatarImage src={userSrc || "https://github.com/shadcn.png"} alt="User Profile Picture" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}