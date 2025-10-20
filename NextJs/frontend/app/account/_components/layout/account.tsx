export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full py-8 p-6 md:p-8 space-y-8">
      {children}
    </div>
  );
}
