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
  const [businessname, setBusinessname] = useState("");
  const [gSTIN, setGSTIN] = useState("");
  const [pan, setPan] = useState("");

  // create command
  const createCompany = api.company.create.useMutation({
    onSuccess: (data) => {
      console.log("Mutation succeeded:", data);
      router.refresh();
      utils.company.invalidate();
      setInputName("");
      setBusinessname("");
      setGSTIN("");
      setPan("");
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
    setBusinessname("");
    setGSTIN("");
    setPan("");

    createCompany.mutate({
      legalname: inputName,
      businessname: businessname,
      GSTIN: gSTIN,
      pan: pan,
      createdById: "",
    });
  };

  const { data } = api.company.read.useQuery();

  const utils = api.useUtils();

  const deleteProduct = api.company.delete.useMutation({
    onSuccess: () => {
      utils.company.invalidate();
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
      }}
    >
      <Dialog>
        <div className="mt-20 flex items-center justify-center">
          <DialogTrigger asChild>
            <button onClick={handleButtonClick} className="border">
              <div className="flex h-full flex-row items-center justify-center rounded-lg border-2 border-dashed border-green-600 p-4 transition hover:-translate-y-1 hover:shadow-xl sm:flex-col">
                <Plus className="h-6 w-6 text-green-600" strokeWidth={3} />
                <h2 className="font-semibold text-green-600 sm:mt-2">
                  Create Company
                </h2>
              </div>
            </button>
          </DialogTrigger>
          <div className="grid grid-cols-4">
            {data &&
              data.map((square, index) => (
                <div className="ml-10 flex flex-row items-center justify-center rounded-lg border-2 border-dashed border-blue-950 p-4 transition hover:-translate-y-1 hover:shadow-xl sm:flex-col w-64 h-52 relative">
                  <div className="p-4" key={index}>
                    <Link href={`/company/${square.businessname}`}>
                      <h3 className="text-xl font-semibold text-gray-900">
                       Company Name: {square.businessname}
                      </h3>
                      <h2>Legal Name:{square.legalname}</h2>
                      <h1>
                        GSTIN:{square.GSTIN}
                      </h1>
                      <h1>PAN NO.{square.pan}</h1>
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
                        values={{
                          id: square.id,
                          legalname: square.legalname,
                          businessname: square.businessname,
                          GSTIN: square.GSTIN,
                          pan: square.pan,
                          createdById: square.createdById,
                        }}
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
                  {/* businessname */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Business Name
                    </Label>
                    <Input
                      id="businessname"
                      defaultValue="@peduarte"
                      className="col-span-3"
                      value={businessname}
                      onChange={(e) => setBusinessname(e.target.value)}
                    />
                  </div>

                  {/* Legal Name */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="legalname" className="text-right">
                      Legal Name
                    </Label>
                    <Input
                      id="username"
                      defaultValue="@peduarte"
                      className="col-span-3"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                    />
                  </div>

                  {/* GSTIN */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gstin" className="text-right">
                      GSTIN
                    </Label>
                    <Input
                      id="GSTIN"
                      defaultValue="@peduarte"
                      className="col-span-3"
                      value={gSTIN}
                      onChange={(e) => setGSTIN(e.target.value)}
                    />
                  </div>

                  {/* PAN NO. */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="pan" className="text-right">
                      PAN NO.
                    </Label>
                    <Input
                      id="pan"
                      defaultValue="@peduarte"
                      className="col-span-3"
                      value={pan}
                      onChange={(e) => setPan(e.target.value)}
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
