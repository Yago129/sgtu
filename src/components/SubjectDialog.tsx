import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Subject } from "@/pages/Subjects";
import { toast } from "sonner";

type SubjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (subject: Omit<Subject, "id">) => void;
  subject?: Subject;
};

export function SubjectDialog({ open, onOpenChange, onSave, subject }: SubjectDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    professor: "",
  });

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject.name,
        professor: subject.professor,
      });
    } else {
      setFormData({
        name: "",
        professor: "",
      });
    }
  }, [subject, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.professor) {
      toast.error("Preencha todos os campos!");
      return;
    }
    onSave(formData);
    toast.success(subject ? "Disciplina atualizada!" : "Disciplina criada com sucesso!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{subject ? "Editar Disciplina" : "Nova Disciplina"}</DialogTitle>
          <DialogDescription>
            Preencha os dados da disciplina
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Disciplina *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Cálculo I"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="professor">Professor/Instrutor *</Label>
            <Input
              id="professor"
              value={formData.professor}
              onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
              placeholder="Ex: Prof. João Silva"
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{subject ? "Atualizar" : "Criar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
