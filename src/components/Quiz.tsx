import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { config } from "@/data/config";
import quizData from "@/data/quiz.json";
import { toast } from "sonner";

interface QuizProps {
  onUnlockGift: () => void;
}

/**
 * Love Quiz Component
 * 
 * Fun multiple-choice quiz about your relationship.
 * Score above threshold unlocks the gift reveal!
 * 
 * 📝 To customize:
 * - Edit src/data/quiz.json to add your own questions
 * - Adjust passing score in src/data/config.ts
 */
export const Quiz = ({ onUnlockGift }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers, answerIndex];
    setSelectedAnswers(newAnswers);

    // Check if answer is correct
    const isCorrect = quizData[currentQuestion].correctAnswer === answerIndex;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    if (isCorrect) {
      toast.success(`${quizData[currentQuestion].emoji} Correct! You know me so well!`);
    } else {
      toast.error(`${quizData[currentQuestion].emoji} Not quite, but I love that you tried!`);
    }

    // Move to next question or show results
    if (currentQuestion < quizData.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 1500);
    } else {
      setTimeout(() => setShowResults(true), 1500);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const isPassing = score >= config.theme.quizPassingScore;

  if (showResults) {
    return (
      <section id="quiz" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="glass-card p-8 md:p-12 text-center shadow-glow">
            <div className="mb-8">
              <div className="text-6xl mb-4">
                {isPassing ? "🎉" : "💝"}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-shimmer">
                Quiz Complete!
              </h3>
              <div className="text-5xl font-bold text-primary mb-4">
                {score} / {quizData.length}
              </div>
              <p className="text-lg text-muted-foreground mb-8">
                {isPassing
                  ? "You know me so well! I love how much attention you pay to our moments together. 💕"
                  : "That's okay! What matters is that we're making memories together. Every moment with you is special. ❤️"}
              </p>
            </div>

            <div className="space-y-4">
              {isPassing && (
                <Button
                  onClick={onUnlockGift}
                  size="lg"
                  className="w-full bg-romantic hover:shadow-glow transition-bounce"
                >
                  🎁 Unlock Your Gift
                </Button>
              )}
              <Button
                onClick={resetQuiz}
                variant="outline"
                size="lg"
                className="w-full"
              >
                Take Quiz Again
              </Button>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <section id="quiz" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-shimmer">
            How Well Do You Know Me?
          </h2>
          <p className="text-lg text-muted-foreground">
            Let's test your memory of our journey together! 💭
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {quizData.length}
          </div>
        </div>

        <Card className="glass-card p-8 shadow-soft">
          <div className="mb-8 text-center">
            <div className="text-5xl mb-4">{question.emoji}</div>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">
              {question.question}
            </h3>
          </div>

          <div className="grid gap-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                variant="outline"
                size="lg"
                className="w-full text-left justify-start h-auto py-4 px-6 hover:bg-primary/10 hover:border-primary transition-smooth"
              >
                <span className="font-medium mr-3 text-primary">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>
        </Card>

        {/* Progress bar */}
        <div className="mt-6 bg-white/50 rounded-full h-2 overflow-hidden">
          <div
            className="bg-romantic h-full transition-smooth"
            style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};
