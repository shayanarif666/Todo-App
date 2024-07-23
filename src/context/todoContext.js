import React, { createContext, useContext } from "react";

export const TodoContext = createContext();

export const TodoProvider = TodoContext.Provider;

export function useTodo() {
    return useContext(TodoContext)
}