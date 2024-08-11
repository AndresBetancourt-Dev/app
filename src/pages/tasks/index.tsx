import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { useAppDispatch, useAppSelector, withAuth } from "@/hooks";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "@/store/reducers/tasks";
import {
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Check, Delete, Undo } from "@mui/icons-material";
import Loading from "@/components/loading";
import { CustomTextField } from "@/components/text-fields";
import { CustomOutlinedButton, GradientButton } from "@/components/buttons";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, status, error } = useAppSelector((state) => state.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (status === "loading") {
    return <Loading />;
  }

  const handleCreate = () => {
    if (newTaskTitle.trim() === "") return;
    dispatch(createTask({ title: newTaskTitle, completed: false }));
    setNewTaskTitle("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreate();
    }
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    dispatch(updateTask({ id, data: { completed: !completed } }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (status === "failed")
    return <Typography color="error">{error}</Typography>;

  return (
    <Container className="p-4 max-w-sm mx-auto h-[100vh] flex flex-col justify-center">
      <div className="mb-4">
        <CustomTextField
          label="Nueva tarea"
          variant="outlined"
          fullWidth
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="mb-2"
          InputLabelProps={{
            classes: {
              root: "font-poppins tracking-tight",
            },
          }}
          InputProps={{
            classes: { input: "font-poppins tracking-tight text-white" },
          }}
        />
        <GradientButton
          onClick={handleCreate}
          variant="contained"
          color="primary"
          fullWidth
          className="mb-2 font-poppins"
        >
          Agregar Tarea
        </GradientButton>
        <CustomOutlinedButton
          onClick={handleLogout}
          variant="outlined"
          color="secondary"
          fullWidth
          className="font-poppins"
        >
          Cerrar Sesión
        </CustomOutlinedButton>
      </div>
      <List className="overflow-y-scroll h-[30vh]">
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            className={task.completed ? "bg-gray-100" : "bg-white"}
          >
            <ListItemText
              className="font-poppins"
              primary={task.title}
              primaryTypographyProps={{
                className:
                  "font-poppins tracking-tight overflow-hidden text-ellipsis",
                style: {
                  textDecoration: task.completed ? "line-through" : "none",
                },
              }}
            />
            <div className="flex space-x-2">
              <IconButton
                onClick={() => handleToggleComplete(task.id, task.completed)}
                color={task.completed ? "primary" : "default"}
              >
                {task.completed ? <Undo /> : <Check />}
              </IconButton>
              <IconButton onClick={() => handleDelete(task.id)} color="error">
                <Delete />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default withAuth(Tasks);
