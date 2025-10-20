import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Sessions = () => {
  const events = [
    {
      title: "Web Development Workshop",
      date: "March 15, 2024",
      location: "Seminar Hall A",
      attendees: 85,
      description: "Hands-on workshop covering React, Node.js, and modern web development practices",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
      type: "Workshop"
    },
    {
      title: "Hackathon 2024",
      date: "February 20-21, 2024",
      location: "Computer Lab Complex",
      attendees: 120,
      description: "24-hour coding marathon with exciting prizes and mentorship from industry experts",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
      type: "Hackathon"
    },
    {
      title: "AI & Machine Learning Seminar",
      date: "January 28, 2024",
      location: "Auditorium",
      attendees: 150,
      description: "Expert talks on the latest trends in AI and practical ML applications",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
      type: "Seminar"
    },
    {
      title: "Git & GitHub Workshop",
      date: "December 10, 2023",
      location: "Lab 301",
      attendees: 65,
      description: "Learn version control essentials and collaborative development workflows",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop",
      type: "Workshop"
    },
    {
      title: "Tech Talk: Cloud Computing",
      date: "November 18, 2023",
      location: "Seminar Hall B",
      attendees: 95,
      description: "Industry expert session on cloud architectures and deployment strategies",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      type: "Tech Talk"
    },
    {
      title: "Mobile App Development",
      date: "October 5, 2023",
      location: "Computer Lab 2",
      attendees: 75,
      description: "Build your first mobile app with React Native and Flutter",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      type: "Workshop"
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
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">Past Sessions</h1>
              <p className="text-xl text-muted-foreground">
                Explore our workshops, hackathons, and tech talks that shaped learning experiences
              </p>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event, index) => (
                <Card 
                  key={index}
                  className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 overflow-hidden group animate-fade-in"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                        {event.type}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-2xl font-semibold mb-3">{event.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{event.attendees} attendees</span>
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

export default Sessions;
