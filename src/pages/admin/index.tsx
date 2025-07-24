import AdminDialogActions from "@/components/admin/dialog/actions";
import AdminDialogAdd from "@/components/admin/dialog/add";
import AdminTable from "@/components/admin/table";
import supabase from "@/lib/db";
import { IMenu } from "@/types/menu";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminPage() {
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [createDialog, setCreateDialog] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<{
    menu: IMenu;
    action: "edit" | "delete";
  } | null>(null);

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

  const handleDeleteMenu = async () => {
    try {
      const { error } = await supabase
        .from("menus")
        .delete()
        .eq("id", selectedMenu?.menu.id);

      if (error) {
        console.log("error: ", error);
      } else {
        setMenus((prev) =>
          prev.filter((menu) => menu.id !== selectedMenu?.menu.id)
        );
        toast("Menu deleted successfully");
        setSelectedMenu(null);
      }
    } catch (error) {
      console.log("error: ", error);
      toast("Failed to delted menu");
    }
  };

  const handleEditMenu = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const { error } = await supabase
        .from("menus")
        .update(Object.fromEntries(formData))
        .eq("id", selectedMenu?.menu.id);

      if (error) {
        console.log("error: ", error);
      } else {
        setMenus((prev) =>
          prev.map((menu) =>
            menu.id === selectedMenu?.menu.id
              ? { ...menu, ...Object.fromEntries(formData) }
              : menu
          )
        );

        toast("Menu edit successfully");
        setSelectedMenu(null);
      }
    } catch (error) {
      console.log("error: ", error);
      toast("Failed to edit menu");
    }
  };
  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 w-full flex justify-between">
        <Link href={"/"}>
          <div className="text-3xl font-bold">Menu</div>
        </Link>
        <AdminDialogAdd
          open={createDialog}
          onOpenChange={setCreateDialog}
          onSubmit={handleAddMenu}
          title="Add"
        />
      </div>
      <div>
        <AdminTable menus={menus} setSelectedMenu={setSelectedMenu} />
      </div>

      <AdminDialogActions
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        handleDeleteMenu={handleDeleteMenu}
        title="Delete"
      />

      <AdminDialogAdd
        title="Edit"
        open={selectedMenu !== null && selectedMenu.action === "edit"}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedMenu(null);
          }
        }}
        onSubmit={handleEditMenu}
        defaultValue={selectedMenu?.menu}
      />
    </div>
  );
}
