import Books from "./books/Books";

export default function Home() {
  return (
    <div className=" h-full flex-1 flex-col gap-8 md:flex">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Libarary Mangement!
          </h2>
          <p className="text-muted-foreground">
            Minimal Library Management System.
          </p>
        </div>
        <div className="flex items-center gap-2">{/* <UserNav /> */}</div>
      </div>
      <Books />
    </div>
  );
}
