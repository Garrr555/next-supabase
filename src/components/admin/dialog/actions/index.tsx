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
} from "@/components/ui/dialog";

interface IDialog {
  title: string;
  selectedMenu: any;
  setSelectedMenu: React.Dispatch<React.SetStateAction<any>>;
  handleDeleteMenu: () => Promise<void>;
}

export default function AdminDialogActions(props: IDialog) {
  const { selectedMenu, setSelectedMenu, handleDeleteMenu } = props;

  return (
    <div>
      <Dialog
        open={selectedMenu !== null && selectedMenu.action === "delete"}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedMenu(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-black">{props.title} Menu</DialogTitle>
            <DialogDescription>
              Are you sure you want to {props.title} {selectedMenu?.menu?.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button className="cursor-pointer" variant={"secondary"}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="cursor-pointer"
              onClick={handleDeleteMenu}
              variant={"destructive"}
            >
              {props.title}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
