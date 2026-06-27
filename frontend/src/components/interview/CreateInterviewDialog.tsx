import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createInterview, updateInterview } from "@/features/interview/interviewThunk"; // Ensure updateInterview is imported
import { createInterviewSchema, type CreateInterviewFormData } from "@/schema/interview";
import type { Interview } from "@/features/interview/interviewTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface CreateInterviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  interviewToEdit?: Interview | null; // Optional prop to enable edit mode
}

export default function CreateInterviewDialog({ 
  open, 
  onOpenChange, 
  interviewToEdit = null 
}: CreateInterviewDialogProps) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.interview.loading);

  const isEditing = !!interviewToEdit;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateInterviewFormData>({
    resolver: zodResolver(createInterviewSchema),
    defaultValues: {
      title: "",
      job_position: "",
      seniority_level: "",
      max_questions: 5,
      status: "draft",
    },
  });

  // Sync form state when dialog opens or interview selection shifts
  useEffect(() => {
    if (open) {
      if (isEditing && interviewToEdit) {
        reset({
          title: interviewToEdit.title,
          job_position: interviewToEdit.job_position,
          seniority_level: interviewToEdit.seniority_level,
          max_questions: interviewToEdit.max_questions,
          status: interviewToEdit.status,
        });
      } else {
        reset({
          title: "",
          job_position: "",
          seniority_level: "",
          max_questions: 5,
          status: "draft",
        });
      }
    }
  }, [interviewToEdit, isEditing, open, reset]);

  const onSubmit = async (data: CreateInterviewFormData) => {
    if (isEditing && interviewToEdit) {
      // 1. Enforce business workflow constraint checking
      if (interviewToEdit.status !== "draft") {
        toast.error(`Cannot edit a session in ${interviewToEdit.status} state. Only drafts are editable.`);
        onOpenChange(false);
        return;
      }

      // 2. Dispatch Update Flow Action
      const result = await dispatch(updateInterview({ id: interviewToEdit.id, data }));
      if (updateInterview.fulfilled.match(result)) {
        toast.success("Interview Updated Successfully");
        onOpenChange(false);
      } else {
        toast.error((result.payload as string) ?? "Failed to update interview.");
      }
    } else {
      // 3. Dispatch Creation Flow Action
      const result = await dispatch(createInterview(data));
      if (createInterview.fulfilled.match(result)) {
        toast.success("Interview Created Successfully");
        reset();
        onOpenChange(false);
      } else {
        toast.error((result.payload as string) ?? "Failed to create interview.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-md gap-0">
        <DialogHeader className="border-b px-6 py-4 pt-5">
          <DialogTitle>
            {isEditing ? "Edit Interview Session" : "Create New Interview Session"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5 p-6">
            <div className="space-y-1.5">
              <Label htmlFor="title">Interview Title</Label>
              <Input {...register("title")} disabled={loading} />
              {errors.title && <p className="text-xs font-medium text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="job_position">Job Position</Label>
              <Input {...register("job_position")} disabled={loading} />
              {errors.job_position && <p className="text-xs font-medium text-red-500">{errors.job_position.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="seniority_level">Seniority Level</Label>
                <Controller
                  control={control}
                  name="seniority_level"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange} disabled={loading}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Entry">Entry Level</SelectItem>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Mid">Mid Level</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                        <SelectItem value="Lead">Lead Track</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.seniority_level && <p className="text-xs font-medium text-red-500">{errors.seniority_level.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="max_questions">Max Questions</Label>
                <Input
                  type="number"
                  disabled={loading}
                  {...register("max_questions", { valueAsNumber: true })}
                />
                {errors.max_questions && <p className="text-xs font-medium text-red-500">{errors.max_questions.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="status">Initial Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select 
                    value={field.value} 
                    onValueChange={field.onChange} 
                    disabled={loading || (isEditing && interviewToEdit?.status !== "draft")}
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["draft", "ready", "ongoing", "completed", "cancelled"].map((st) => (
                        <SelectItem key={st} value={st} className="capitalize">{st}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && <p className="text-xs font-medium text-red-500">{errors.status.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-end border-t p-4 space-x-2 bg-muted/20">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="cursor-pointer" disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading} className="min-w-28 cursor-pointer">
              {loading ? "Saving..." : isEditing ? "Save Changes" : "Create Session"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}