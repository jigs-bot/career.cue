// import Image from "next/image"
// import Link from "next/link"
import {Link} from 'react-router-dom';

import { Outlet } from 'react-router-dom';
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
  Hash,
  Newspaper,
  CirclePlus
} from "lucide-react"


import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"


import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Navbar from "../components/navbar"
import  Allcard  from "../components/allCard"
import Header from '../components/Header';
export function Main() {
  // const avatar = localStorage.getItem('avatar');
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
    <Navbar/>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header/>
        <Outlet/>
      </div>
    </div>
  )
}

export default Main;