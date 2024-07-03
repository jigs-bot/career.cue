import * as React from "react"

import { ScrollArea ,ScrollBar} from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

function FollowScroll() {
  return (
    <ScrollArea className="h-40 w-96 rounded-md border">
      <div className="w-full overflow-x-auto">
        <h4 className="flex space-x-4 ">Tags</h4>
        {tags.map((tag,index) => (
          <div key={index}>
            <div className="flex-shrink-0 p-4 bg-gray-100 rounded-lg">
              {tag}
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default FollowScroll;