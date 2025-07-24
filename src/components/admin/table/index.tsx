/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMenu } from "@/types/menu";
import { convertIDR } from "@/utils/currency";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

interface IProps {
  menus: IMenu[];
  setSelectedMenu: React.Dispatch<React.SetStateAction<any>>;
}

export default function AdminTable(props: IProps) {
  const { menus, setSelectedMenu } = props;

  return (
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
            <TableHead className="text-neutral-700 font-bold">Price</TableHead>
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
                      <DropdownMenuItem
                        className=" "
                        onClick={() =>
                          setSelectedMenu({ menu: menu, action: "edit" })
                        }
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className=" text-red-700"
                        onClick={() =>
                          setSelectedMenu({ menu: menu, action: "delete" })
                        }
                      >
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
  );
}
