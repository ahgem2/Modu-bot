
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { BadgeCheck, Mail, Tag } from "lucide-react";
import { supabase } from "@/lib/supabase";

const CementED = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: "Missing information",
        description: "Please provide both your name and email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-cementED-inquiry", {
        body: { name, email }
      });

      if (error) throw error;

      toast({
        title: "Thank you for your interest!",
        description: "We've received your inquiry about CementED. Our team will get back to you soon.",
        duration: 5000,
      });

      // Reset form
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error sending inquiry:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't process your request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>CementED Beta Program - ModuBot</title>
        <meta name="description" content="Join our CementED beta program to transform your lead generation with personalized communication strategies." />
      </Helmet>

      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">CementED</h1>
          <Tag className="text-purple-600 h-8 w-8" />
          <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 text-sm font-medium rounded-full">
            Beta Program
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2 space-y-6">
            <p className="text-lg leading-relaxed">
              At CementED, we believe that effective communication is the cornerstone of building lasting business relationships. Our model goes beyond traditional lead generation by crafting personalized communication strategies that align with your unique tone, preferences, and style.
            </p>

            <p className="text-lg leading-relaxed">
              We design a lead generation pattern that not only attracts potential clients but also nurtures authentic connections, allowing you to engage with people on a deeper, more personal level than ever before.
            </p>

            <p className="text-lg leading-relaxed">
              Our approach ensures that every interaction is meaningful and tailored to resonate with your target audience, transforming leads into genuine relationships. By leveraging customized communication tactics, we help you gain momentum in your lead base, driving sustainable growth and creating opportunities to connect with individuals who truly align with your business vision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <div className="flex items-start gap-3">
                <BadgeCheck className="text-green-600 h-6 w-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Personalized Communication</h3>
                  <p className="text-muted-foreground">Tailored to your unique voice and style</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BadgeCheck className="text-green-600 h-6 w-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Authentic Connections</h3>
                  <p className="text-muted-foreground">Build deeper relationships with clients</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Join the Beta Program</CardTitle>
                <CardDescription>
                  Express your interest in the CementED beta program and we'll get back to you with exclusive early access.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading} 
                  className="w-full"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      I'm Interested!
                    </span>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CementED;
