/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SelectLabel } from "@radix-ui/react-select";

interface IDialog {
  title?: "Add" | "Edit";
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  defaultValue?: any;
}

export default function AdminDialogAdd(props: IDialog) {
  const { open, onOpenChange, onSubmit, defaultValue, title } = props;

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild className={`${title === "Add" ? "" : "hidden"}`}>
          <Button className="font-bold ">{title}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={onSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-black">{title} Menu</DialogTitle>
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
                  defaultValue={defaultValue?.name}
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  placeholder="Insert Price"
                  name="price"
                  required
                  defaultValue={defaultValue?.price}
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  placeholder="Insert Image"
                  name="image"
                  required
                  defaultValue={defaultValue?.image}
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="category">Category</Label>
                <Select
                  name="category"
                  required
                  defaultValue={defaultValue?.category}
                >
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
                  defaultValue={defaultValue?.description}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button
                  className="cursor-pointer"
                  variant={"secondary"}
                  type="button"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button className="cursor-pointer" type="submit">
                {title}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
