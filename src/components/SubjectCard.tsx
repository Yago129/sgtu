import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, User } from "lucide-react";
import { Subject } from "@/pages/Subjects";

type SubjectCardProps = {
  subject: Subject;
  onEdit: () => void;
  onDelete: () => void;
};

export function SubjectCard({ subject, onEdit, onDelete }: SubjectCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{subject.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <span>{subject.professor}</span>
        </div>
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
