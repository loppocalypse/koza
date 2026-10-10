import "./globals.css";
import { FavoritesProvider } from "@/src/lib/favorites";
import { LanguageProvider } from "@/src/lib/i18n";

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
      <body className="antialiased">
        <LanguageProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
