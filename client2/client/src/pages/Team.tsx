import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Team = () => {
  const members = [
    {
      name: "Anshul Shelokar",
      role: "Secretary",
      department: "Computer Engineering",
      year: "Third Year",
      skills: ["React", "TypeScript", "Node.js"],
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anshul"
    },
    {
      name: "Paras Dhole",
      role: "Project Manager",
      department: "Computer Engineering",
      year: "Third Year",
      skills: ["Project Management", "Full Stack", "DevOps"],
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paras"
    },
    {
      name: "Yash Hodlur",
      role: "Project Manager",
      department: "IT",
      year: "Third Year",
      skills: ["Project Management", "Python", "Docker"],
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yash"
    },
    {
      name: "Aastha Jajoo",
      role: "Events and Documentation Head",
      department: "IT",
      year: "Third Year",
      skills: ["Event Management", "Technical Writing", "UI/UX"],
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aastha"
    },
    {
      name: "Janhavi Jain",
      role: "Events and Documentation Head",
      department: "Computer Engineering",
      year: "Third Year",
      skills: ["Event Planning", "Documentation", "Content Writing"],
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Janhavi"
    },
    {
      name: "Nisarg Wath",
      role: "Events & Documentation Head",
      department: "IT",
      year: "Third Year",
      skills: ["Event Coordination", "Technical Documentation", "Marketing"],
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nisarg"
    },
    {
      name: "Mehmood D",
      role: "Technical Head",
      department: "Computer Engineering",
      year: "Final Year",
      skills: ["Full Stack", "System Design", "Cloud Computing"],
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmood"
    },
    {
      name: "Yashwant Bhosale",
      role: "Technical Head",
      department: "Computer Engineering",
      year: "Final Year",
      skills: ["Backend Development", "DevOps", "Database Design"],
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yashwant"
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">Our Team</h1>
              <p className="text-xl text-muted-foreground">
                Meet the talented individuals driving innovation at SDS COEP
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member, index) => (
                <Card 
                  key={index}
                  className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 animate-fade-in"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-32 h-32 rounded-full mb-4 border-2 border-primary"
                      />
                      <h3 className="font-heading text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-2">{member.role}</p>
                      <p className="text-sm text-muted-foreground mb-1">{member.department}</p>
                      <p className="text-sm text-muted-foreground mb-4">{member.year}</p>
                      
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {member.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <a 
                          href="#" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        <a 
                          href="#" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a 
                          href="#" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Email"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Team;
