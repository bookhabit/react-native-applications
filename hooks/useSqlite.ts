import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { User, CreateUserData } from "../types/sqlite";

const db = SQLite.openDatabaseSync("app_database.db");

export const useSqlite = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize database
  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          age INTEGER NOT NULL
        );
      `);
      console.log("Database initialized successfully");
      loadUsers();
    } catch (error) {
      console.error("Error initializing database:", error);
      setIsLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const result = await db.getAllAsync<User>(
        "SELECT * FROM users ORDER BY name ASC;"
      );
      setUsers(result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading users:", error);
      setIsLoading(false);
    }
  };

  const addUser = async (userData: CreateUserData): Promise<number> => {
    try {
      const result = await db.runAsync(
        "INSERT INTO users (name, email, age) VALUES (?, ?, ?);",
        [userData.name, userData.email, userData.age]
      );
      console.log("User added successfully");
      loadUsers();
      return result.lastInsertRowId;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };

  const updateUser = async (
    id: number,
    userData: CreateUserData
  ): Promise<void> => {
    try {
      await db.runAsync(
        "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?;",
        [userData.name, userData.email, userData.age, id]
      );
      console.log("User updated successfully");
      loadUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const deleteUser = async (id: number): Promise<void> => {
    try {
      await db.runAsync("DELETE FROM users WHERE id = ?;", [id]);
      console.log("User deleted successfully");
      loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  const deleteAllUsers = async (): Promise<void> => {
    try {
      await db.runAsync("DELETE FROM users;");
      console.log("All users deleted successfully");
      loadUsers();
    } catch (error) {
      console.error("Error deleting all users:", error);
      throw error;
    }
  };

  return {
    users,
    isLoading,
    addUser,
    updateUser,
    deleteUser,
    deleteAllUsers,
    refreshUsers: loadUsers,
  };
};
