import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
    Hash
  } from "lucide-react"
function TagCard({name}) {
  return (
    <Card className="w-80 h-64 sm:h-48 bg-white shadow-md rounded p-4 m-2">
      <CardHeader>
        <CardTitle>
            <Hash size={24} strokeWidth={2.75}/> {name}
        </CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div></div>
        <Button className=" bg-blue-500 text-white hover: size-fit" size="sm" >
          Follow
        </Button>
      </CardContent>
    </Card>
  )
}

export default TagCard