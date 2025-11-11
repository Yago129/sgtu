import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, CheckCircle, Circle } from "lucide-react";
import { Task } from "@/pages/Tasks";

type TaskCardProps = {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
};

const statusMap = {
  todo: { label: "A Fazer", color: "bg-muted" },
  "in-progress": { label: "Em Andamento", color: "bg-warning" },
  done: { label: "Concluída", color: "bg-success" },
};

export function TaskCard({ task, onEdit, onDelete, onToggleStatus }: TaskCardProps) {
  const status = statusMap[task.status];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <Button
            size="icon"
            variant="ghost"
            onClick={onToggleStatus}
            className="shrink-0"
          >
            {task.status === "done" ? (
              <CheckCircle className="w-5 h-5 text-success" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{task.description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{task.subject}</Badge>
          <Badge className={status.color}>{status.label}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Prazo: {new Date(task.dueDate).toLocaleDateString("pt-BR")}
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm" variant="outline" onClick={onEdit} className="flex-1 gap-2">
          <Pencil className="w-4 h-4" />
          Editar
        </Button>
        <Button size="sm" variant="destructive" onClick={onDelete} className="flex-1 gap-2">
          <Trash2 className="w-4 h-4" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
}
