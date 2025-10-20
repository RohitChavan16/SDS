import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Users, Lightbulb, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              SOFTWARE DEVELOPMENT SECTION
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 mb-8">
              The official club for software development of COEP Tech
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/about">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-foreground hover:bg-primary/10">
                <Link to="/request-project">Request a Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl font-bold text-center mb-12">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <CardContent className="p-6">
                <Code2 className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">Development</h3>
                <p className="text-muted-foreground">
                  Build innovative software solutions and bring ideas to life
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">Collaboration</h3>
                <p className="text-muted-foreground">
                  Work with talented developers and learn from each other
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <CardContent className="p-6">
                <Lightbulb className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  Explore cutting-edge technologies and creative solutions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <CardContent className="p-6">
                <Rocket className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">Growth</h3>
                <p className="text-muted-foreground">
                  Enhance your skills through workshops and real projects
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of COEP's most active tech community. Learn, build, and grow with us.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
