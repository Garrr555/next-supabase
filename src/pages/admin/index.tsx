import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/lib/db";
import { IMenu } from "@/types/menu";
import { convertIDR } from "@/utils/currency";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminPage() {
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [createDialog, setCreateDialog] = useState(false);

  useEffect(() => {
    const fetchMenus = async () => {
      const { data, error } = await supabase.from("menus").select("*");

      if (error) {
        console.log("error: ", error);
      } else {
        setMenus(data);
      }
    };

    fetchMenus();
  }, [supabase]);

  const handleAddMenu = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const { data, error } = await supabase
        .from("menus")
        .insert(Object.fromEntries(formData))
        .select("*");

      if (error) {
        console.log("error: ", error);
      } else {
        if (data) {
          setMenus((prev) => [...prev, ...data]);
        }

        toast("Menu added successfully");
        setCreateDialog(false);
      }
    } catch (error) {
      console.log("error: ", error);
      toast("Failed to add menu");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 w-full flex justify-between">
        <Link href={"/"}>
          <div className="text-3xl font-bold">Menu</div>
        </Link>
        <Dialog open={createDialog} onOpenChange={setCreateDialog}>
          <DialogTrigger asChild>
            <Button className="font-bold ">Add Menu</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <form onSubmit={handleAddMenu} className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-neutral-500">Add Menu</DialogTitle>
                <DialogDescription>
                  Create a new menu by insert data in this form
                </DialogDescription>
              </DialogHeader>
              <div className="grid w-full gap-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Insert Name"
                    name="name"
                    required
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    placeholder="Insert Price"
                    name="price"
                    required
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    placeholder="Insert Image"
                    name="image"
                    required
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="drink">Drink</SelectItem>
                        <SelectItem value="dessert">Dessert</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    className="resize-none h-32"
                    id="description"
                    placeholder="Insert Description"
                    name="description"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button className="cursor-pointer" variant={"secondary"}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="cursor-pointer" type="submit">
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-neutral-700 font-bold">
                Product
              </TableHead>
              <TableHead className="text-neutral-700 font-bold">
                Description
              </TableHead>
              <TableHead className="text-neutral-700 font-bold">
                Category
              </TableHead>
              <TableHead className="text-neutral-700 font-bold">
                Price
              </TableHead>
              <TableHead className="text-neutral-700 font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menus.map((menu: IMenu) => (
              <TableRow key={menu.id}>
                <TableCell className="flex gap-3 items-center w-full">
                  <Image
                    className="aspect-square object-cover rounded-lg"
                    width={50}
                    height={50}
                    src={menu.image}
                    alt={menu.name}
                  />
                  {menu.name}
                </TableCell>
                <TableCell>
                  {menu.description.split(" ").slice(0, 5).join(" ") + "..."}
                </TableCell>
                <TableCell>{menu.category}</TableCell>
                <TableCell>{convertIDR(menu.price)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel className="font-bold">
                        Action
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem className=" text-red-400">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
