"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, PlusCircle, Search } from "lucide-react";

// Scrollbar styles
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

const EnhancedPasswordManagerDashboard = () => {
  const [passwords, setPasswords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPasswordId, setShowPasswordId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPassword, setEditingPassword] = useState(null);
  const [newPassword, setNewPassword] = useState({ site: "", username: "", password: "" });

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch passwords');
      }
      const data = await response.json();
      setPasswords(data);
    } catch (error) {
      console.error('Error fetching passwords:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const filteredPasswords = passwords.filter(
    (pw) =>
      pw.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pw.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePasswordVisibility = (id) => {
    setShowPasswordId(showPasswordId === id ? null : id);
  };

  const handleAddEditPassword = async () => {
    try {
      let response;
      console.log(editingPassword)
      console.log(newPassword)

      if (editingPassword) {
        response = await fetch('/api/users', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPassword),
        });
      } else {
        response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPassword),
        });
        // response = await axios.post('/api/users', newPassword)
      }

      if (!response.ok) {
        throw new Error('Failed to save password');
      }

      await fetchPasswords(); // Refresh the password list
      setIsModalOpen(false);
      setEditingPassword(null);
      setNewPassword({ site: "", username: "", password: "" });
    } catch (error) {
      console.error('Error saving password:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleEditPassword = (password) => {
    console.log(password)
    setEditingPassword(password);
    setNewPassword(password);
    setIsModalOpen(true);
  };

  const handleDeletePassword = async (id) => {
    console.log("Deleting password with ID:", id);


    const toDeletePassword = passwords.filter((pw) => pw._id === id)[0]
    const {site,username,password} = toDeletePassword

    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({site,username,password})
        // body: toDeletePassword
      });
      // const reponse = await axios.delete('/api/users', toDeletePassword)

      if (!response.ok) {
        throw new Error('Failed to delete password');
      }

      await fetchPasswords(); // Refresh the password list
    } catch (error) {
      console.error('Error deleting password:', error);
      // Handle error (e.g., show error message to user)
    }
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
                <TableCell>{pw.site}</TableCell>
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
                      onClick={() => handleDeletePassword(pw._id)}
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
              <Label htmlFor="site" className="text-right">
                Website
              </Label>
              <Input
                id="site"
                value={newPassword.site}
                onChange={(e) => setNewPassword({ ...newPassword, site: e.target.value })}
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