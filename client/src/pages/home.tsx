import Header from "@/components/header";
import Hero from "@/components/hero";
import Products from "@/components/products";
import About from "@/components/about";
import Gallery from "@/components/gallery";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Products />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
