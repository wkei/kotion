import DocumentHead from "./doc-head";
import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex min-h-screen flex-col">
      <DocumentHead />
      <Header />
      <main className="mb-auto">{children}</main>
      <Footer />
    </div>
  );
}
