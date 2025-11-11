import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { TaskDialog } from "@/components/TaskDialog";
import { TaskCard } from "@/components/TaskCard";

export type Task = {
  id: string;
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  status: "todo" | "in-progress" | "done";
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Trabalho de Cálculo",
      description: "Resolver exercícios do capítulo 5",
      subject: "Cálculo I",
      dueDate: "2024-01-20",
      status: "todo",
    },
    {
      id: "2",
      title: "Leitura de Sociologia",
      description: "Ler capítulos 3 e 4 do livro",
      subject: "Sociologia",
      dueDate: "2024-01-22",
      status: "in-progress",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleAddTask = (task: Omit<Task, "id">) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }]);
  };

  const handleEditTask = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "done" ? "todo" : "done" }
          : t
      )
    );
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Minhas Tarefas</h1>
          <p className="text-muted-foreground">Gerencie suas atividades acadêmicas</p>
        </div>
        <Button
          size="lg"
          onClick={() => setIsDialogOpen(true)}
          className="gap-2"
        >
          <Plus className="w-5 h-5" />
          Adicionar Nova Tarefa
        </Button>
      </div>

      {tasks.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">Nenhuma tarefa cadastrada ainda.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => openEditDialog(task)}
              onDelete={() => handleDeleteTask(task.id)}
              onToggleStatus={() => handleToggleStatus(task.id)}
            />
          ))}
        </div>
      )}

      <TaskDialog
        open={isDialogOpen}
        onOpenChange={handleDialogClose}
        onSave={(task) => {
          if (editingTask) {
            handleEditTask({ ...task, id: editingTask.id } as Task);
          } else {
            handleAddTask(task);
          }
          handleDialogClose();
        }}
        task={editingTask}
      />
    </div>
  );
};

export default Tasks;
