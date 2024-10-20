"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, PlusCircle, Search } from "lucide-react";

// Add this CSS for custom scrollbar
const scrollbarStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #4a5568 #cbd5e0;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #cbd5e0;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #4a5568;
    border-radius: 4px;
    border: 2px solid #cbd5e0;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #2d3748;
  }
`;

// Basic encryption function (for demonstration purposes only)
const encrypt = (text) => btoa(text);
const decrypt = (text) => atob(text);

const EnhancedPasswordManagerDashboard = () => {
  const [passwords, setPasswords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPasswordId, setShowPasswordId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPassword, setEditingPassword] = useState(null);
  const [newPassword, setNewPassword] = useState({ website: "", username: "", password: "" });

  useEffect(() => {
    const storedPasswords = localStorage.getItem("passwords");
    if (storedPasswords) {
      setPasswords(JSON.parse(storedPasswords).map((pw) => ({
        ...pw,
        password: decrypt(pw.password)
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwords.map(pw => ({
      ...pw,
      password: encrypt(pw.password)
    }))));
  }, [passwords]);

  const filteredPasswords = passwords.filter(
    (pw) =>
      pw.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pw.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePasswordVisibility = (id) => {
    setShowPasswordId(showPasswordId === id ? null : id);
  };

  const handleAddEditPassword = () => {
    if (editingPassword) {
      setPasswords(passwords.map(pw => pw.id === editingPassword.id ? { ...newPassword, id: editingPassword.id } : pw));
    } else {
      setPasswords([...passwords, { ...newPassword, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingPassword(null);
    setNewPassword({ website: "", username: "", password: "" });
  };

  const handleEditPassword = (password) => {
    setEditingPassword(password);
    setNewPassword(password);
    setIsModalOpen(true);
  };

  const handleDeletePassword = (id) => {
    setPasswords(passwords.filter((pw) => pw.id !== id));
  };

  const getPasswordStrength = (password) => {
    const strength = password.length >= 12 ? 3 : password.length >= 8 ? 2 : 1;
    return ["Weak", "Medium", "Strong"][strength - 1];
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl mb-36 mt-11">
      <style>{scrollbarStyles}</style>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Password Manager</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Password
        </Button>
      </header>

      <div className="relative mb-6">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Search passwords..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="h-[400px] overflow-y-auto border rounded-lg custom-scrollbar">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky top-0 bg-background">Website</TableHead>
              <TableHead className="sticky top-0 bg-background">Username</TableHead>
              <TableHead className="sticky top-0 bg-background">Password</TableHead>
              <TableHead className="sticky top-0 bg-background">Strength</TableHead>
              <TableHead className="sticky top-0 bg-background">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPasswords.map((pw) => (
              <TableRow key={pw.id}>
                <TableCell>{pw.website}</TableCell>
                <TableCell>{pw.username}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Lock className="mr-2 h-4 w-4 text-gray-400" />
                    {showPasswordId === pw.id ? pw.password : "••••••••"}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePasswordVisibility(pw.id)}
                      className="ml-2"
                    >
                      {showPasswordId === pw.id ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPasswordId === pw.id ? "Hide" : "Show"} password
                      </span>
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{getPasswordStrength(pw.password)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditPassword(pw)}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePassword(pw.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPassword ? "Edit Password" : "Add New Password"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="website" className="text-right">
                Website
              </Label>
              <Input
                id="website"
                value={newPassword.website}
                onChange={(e) => setNewPassword({ ...newPassword, website: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={newPassword.username}
                onChange={(e) => setNewPassword({ ...newPassword, username: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={newPassword.password}
                onChange={(e) => setNewPassword({ ...newPassword, password: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddEditPassword}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedPasswordManagerDashboard;