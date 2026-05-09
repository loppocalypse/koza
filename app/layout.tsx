import "./globals.css";

export const metadata = {
  title: "Koza | Furniture & Textiles",
  description: "Curating the world's most intentional furniture for the modern sanctuary.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
