"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import Link from "next/link";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import CompanyForm from "@/components/admin/company/companyForm";

const MainPage = () => {
  const [squares, setSquares] = useState<
    { id: number; clicked: boolean; name?: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [inputName, setInputName] = useState("");

  // create command
  const createCompany = api.company.create.useMutation({
    onSuccess: (data) => {
      console.log("Mutation succeeded:", data);
      router.refresh();
      setInputName("");
    },
  });

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveClick = () => {
    setIsModalOpen(false);
    const newId =
      squares.length > 0 && squares[squares.length - 1] !== undefined
        ? // @ts-ignore
          squares[squares.length - 1].id + 1
        : 1;
    setSquares([...squares, { id: newId, clicked: false, name: inputName }]);
    setInputName("");

    createCompany.mutate({
      name: inputName,
    });
  };

  const { data, isLoading } = api.company.read.useQuery();

  const utils = api.useUtils();

  const deleteProduct = api.company.delete.useMutation({
    onSuccess: () => {
      utils.product.invalidate();
      toast.success("Product deleted!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const handleClick = (id: number) => {
    deleteProduct.mutate({ id });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // createCompany.mutate({ name: inputName });
      }}
    >
      <Dialog>
        <div className="mt-20 flex items-center justify-center">
          <DialogTrigger asChild>
            <button onClick={handleButtonClick} className="border">
              <div className="flex h-full flex-row items-center justify-center rounded-lg border-2 border-dashed border-blue-950 p-4 transition hover:-translate-y-1 hover:shadow-xl sm:flex-col">
                <Plus className="h-6 w-6 text-blue-950" strokeWidth={3} />
                <h2 className="font-semibold text-blue-950 sm:mt-2">
                  Create Company
                </h2>
              </div>
            </button>
          </DialogTrigger>
          <div className="grid grid-cols-4">
            {data &&
              data.map((square, index) => (
                <div className="ml-10 flex h-full flex-row items-center justify-center rounded-lg border-2 border-dashed border-blue-950 p-4 transition hover:-translate-y-1 hover:shadow-xl sm:flex-col">
                  <div className="p-4" key={index}>
                    <Link href={`/company/${square.id}`}>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {square.name}
                      </h3>
                    </Link>
                    <div className="h-1"></div>

                    {/* edit and delete button */}
                    <div className="flex">
                      <CompanyForm
                        formBtnTitle="Edit Company Name"
                        btn={
                          <Button
                            variant="outline"
                            className="group h-7 rounded-r-none p-2"
                          >
                            <Pencil className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                          </Button>
                        }
                        values={{ id: square.id, name:square.name , createdById: square.createdById}}
                      />
                      <Button
                        variant="outline"
                        className="group h-7 rounded-l-none border-l-0 p-2"
                        disabled={deleteProduct.isLoading}
                        onClick={() => handleClick(square.id)}
                      >
                        {deleteProduct.isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {isModalOpen && (
            <div className="modal">
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create profile</DialogTitle>
                  <DialogDescription>
                    Save changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Company Name
                    </Label>
                    <Input
                      id="username"
                      defaultValue="@peduarte"
                      className="col-span-3"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSaveClick();
                    }}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </div>
          )}
        </div>
      </Dialog>
    </form>
  );
};

export default MainPage;
