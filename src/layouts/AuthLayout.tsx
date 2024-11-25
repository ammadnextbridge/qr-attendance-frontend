type Props = {
  children: React.ReactNode;
};
export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {children}
    </div>
  );
}
