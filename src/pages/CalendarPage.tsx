import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Simulação de tarefas com prazos
  const tasksWithDeadlines = [
    { date: "2024-01-15", title: "Entrega Trabalho Cálculo", color: "bg-primary" },
    { date: "2024-01-20", title: "Prova Sociologia", color: "bg-secondary" },
    { date: "2024-01-25", title: "Apresentação Programação", color: "bg-warning" },
  ];

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const hasTask = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasksWithDeadlines.find((t) => t.date === dateStr);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Calendário</h1>
        <p className="text-muted-foreground">Visualize seus prazos e compromissos</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" onClick={previousMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={nextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div key={day} className="font-semibold text-sm text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const task = hasTask(day);
              const isToday =
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();

              return (
                <div
                  key={day}
                  className={`aspect-square rounded-lg border-2 p-2 flex flex-col items-center justify-center transition-all hover:shadow-md ${
                    isToday ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <span className={`text-sm font-medium ${isToday ? "text-primary" : ""}`}>
                    {day}
                  </span>
                  {task && (
                    <div className={`w-2 h-2 rounded-full ${task.color} mt-1`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Próximos Prazos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tasksWithDeadlines.map((task, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${task.color}`} />
                <span className="font-medium">{task.title}</span>
              </div>
              <Badge variant="outline">
                {new Date(task.date).toLocaleDateString("pt-BR")}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;
