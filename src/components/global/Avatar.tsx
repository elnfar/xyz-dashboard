import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Avatar } from "../ui/avatar"

export function UserAvatar({src}: {
    src:string
  }) {
    return (
      <Avatar className="flex items-center justify-center">
        <AvatarImage src={src} alt="@shadcn" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
  }