"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./quiz-result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const displayedAssessments = showAll ? assessments : assessments?.slice(0, 3);

  return (
    <>
      <Card className="rounded-xl shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="gradient-title text-3xl md:text-4xl">
                Recent Quizzes
              </CardTitle>
              <CardDescription>
                Review your past quiz performance
              </CardDescription>
            </div>
            <Button 
              onClick={() => router.push("/interview/mock")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Start New Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedAssessments?.map((assessment, i) => (
              <Card
                key={assessment.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors h-48 flex flex-col justify-between"
                onClick={() => setSelectedQuiz(assessment)}
              >
                <CardHeader className="flex-grow">
                  <CardTitle className="gradient-title text-xl">
                    Quiz {i + 1}
                  </CardTitle>
                  <CardDescription className="flex flex-col space-y-2">
                    <div>Score: {assessment.quizScore.toFixed(1)}%</div>
                    <div className="text-xs">
                      {format(
                        new Date(assessment.createdAt),
                        "MMM dd, yyyy HH:mm"
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                {assessment.improvementTip && (
                  <CardContent className="overflow-hidden">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {assessments?.length > 3 && (
            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600 px-8 py-4 rounded-full"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "View More"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}