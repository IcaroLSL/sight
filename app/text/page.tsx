import Editor from "@/components/EditorTextBlock";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-foreground">Bem-vindo ao Sight</h1>
        <Editor />
      </div>
    </div>
  );
}