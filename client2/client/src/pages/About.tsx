import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import aboutTeam from "@/assets/about-team.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">About SDS COEP</h1>
              <p className="text-xl text-muted-foreground">
                Empowering students to build, innovate, and excel in software development
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="animate-fade-in">
                <img 
                  src={aboutTeam} 
                  alt="SDS Team collaborating" 
                  className="rounded-lg shadow-2xl"
                />
              </div>
              <div className="space-y-8 animate-fade-in">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-8 h-8 text-primary" />
                    <h2 className="font-heading text-3xl font-bold">Our Mission</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To create a vibrant community of passionate developers who collaborate on meaningful projects, 
                    share knowledge, and push the boundaries of technology. We strive to bridge the gap between 
                    academic learning and real-world software development.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-8 h-8 text-primary" />
                    <h2 className="font-heading text-3xl font-bold">Our Vision</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the premier student-led software development organization that produces skilled developers 
                    ready to make an impact in the tech industry. We envision a future where every member contributes 
                    to innovative solutions that solve real problems.
                  </p>
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">Excellence</h3>
                  <p className="text-muted-foreground">
                    We pursue excellence in every project, workshop, and learning opportunity
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">Collaboration</h3>
                  <p className="text-muted-foreground">
                    Working together to achieve more than we could individually
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-heading text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    Embracing new technologies and creative approaches to problem-solving
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Active Members</div>
              </div>
              <div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2">30+</div>
                <div className="text-muted-foreground">Projects Completed</div>
              </div>
              <div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2">20+</div>
                <div className="text-muted-foreground">Workshops Held</div>
              </div>
              <div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2">5+</div>
                <div className="text-muted-foreground">Years Active</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
