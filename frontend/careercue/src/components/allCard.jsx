import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from "@/components/image";
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
  Newspaper
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
const backendUrl = process.env.BACKEND_URL;
function allCard({val}) {

  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async (page) => {
      const jwtToken = localStorage.getItem('authToken');
      try {
        const response = await axios.get(`${backendUrl}/experience/a`, {
          params: { page, limit: 10, val },
          headers: {
            Authorization: `Bearer ${jwtToken}` // Attach the JWT token to the request
          }
        });
        console.log(response.data.blogs)
        setBlogs(response.data.blogs);
        console.log(response.data.blogs)
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs(currentPage);
  }, [currentPage, val]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };





  return (
    <Card x-chunk="dashboard-06x`-chunk-0">
      <CardHeader>
        <CardTitle>Blogs</CardTitle>
        <CardDescription>
          Read the latest blogs from professionals across  the world.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>

          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="hidden md:table-cell">
                Created at
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>

          {blogs.map((blog) => (
            <TableRow key={blog._id}>
            <TableCell className="hidden sm:table-cell">
              <Image
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                height="64"
                src="/placeholder.svg"
                width="64"
              />
            </TableCell>
            <TableCell className="font-medium">
              {blog.title}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{blog.tags}</Badge>
            </TableCell>
            <TableCell>{blog.createdAt}</TableCell>
            {/* <TableCell className="hidden md:table-cell">
              
            </TableCell> */}
            <TableCell className="hidden md:table-cell">
              2024-01-01 12:00 AM
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    variant="ghost"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          ))}

            
            
          </TableBody>

        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong>{" "}
          products
        </div>
      </CardFooter>
    </Card>
  )
}

export default allCard