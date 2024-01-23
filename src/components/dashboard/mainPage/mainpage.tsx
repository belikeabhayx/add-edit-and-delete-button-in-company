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
        ? squares[squares.length - 1].id + 1
        : 1;
    setSquares([...squares, { id: newId, clicked: false, name: inputName }]);
    setInputName("");

    createCompany.mutate({ name: inputName });
  };

  const handleSquareClick = (id: number) => {
    setSquares(
      squares.map((square) =>
        square.id === id ? { ...square, clicked: true } : square,
      ),
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createCompany.mutate({ name: inputName });
      }}
    >
      <Dialog>
        <div className="mt-20 flex items-center justify-center">
          <DialogTrigger asChild>
            <Button onClick={handleButtonClick} className="border">
              Create Company
            </Button>
          </DialogTrigger>
          {squares.map((square, index) => (
            <div
              key={index}
              onClick={() => handleSquareClick(square.id)}
              className={`h-24 w-48 ${square.clicked ? "bg-red-500" : "bg-blue-500"}`}
            >
              {square.name}
            </div>
          ))}
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
