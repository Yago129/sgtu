import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { SubjectDialog } from "@/components/SubjectDialog";
import { SubjectCard } from "@/components/SubjectCard";

export type Subject = {
  id: string;
  name: string;
  professor: string;
};

const Subjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", name: "Cálculo I", professor: "Prof. João Silva" },
    { id: "2", name: "Sociologia", professor: "Profa. Maria Santos" },
    { id: "3", name: "Programação Web", professor: "Prof. Carlos Mendes" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | undefined>();

  const handleAddSubject = (subject: Omit<Subject, "id">) => {
    setSubjects([...subjects, { ...subject, id: Date.now().toString() }]);
  };

  const handleEditSubject = (subject: Subject) => {
    setSubjects(subjects.map((s) => (s.id === subject.id ? subject : s)));
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const openEditDialog = (subject: Subject) => {
    setEditingSubject(subject);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingSubject(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Disciplinas</h1>
          <p className="text-muted-foreground">Gerencie suas matérias e professores</p>
        </div>
        <Button
          size="lg"
          onClick={() => setIsDialogOpen(true)}
          className="gap-2"
        >
          <Plus className="w-5 h-5" />
          Cadastrar Nova Disciplina
        </Button>
      </div>

      {subjects.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">Nenhuma disciplina cadastrada ainda.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onEdit={() => openEditDialog(subject)}
              onDelete={() => handleDeleteSubject(subject.id)}
            />
          ))}
        </div>
      )}

      <SubjectDialog
        open={isDialogOpen}
        onOpenChange={handleDialogClose}
        onSave={(subject) => {
          if (editingSubject) {
            handleEditSubject({ ...subject, id: editingSubject.id } as Subject);
          } else {
            handleAddSubject(subject);
          }
          handleDialogClose();
        }}
        subject={editingSubject}
      />
    </div>
  );
};

export default Subjects;
