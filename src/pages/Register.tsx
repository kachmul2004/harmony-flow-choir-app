
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [voiceType, setVoiceType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(name, email, password);
      toast({
        title: "Registration successful",
        description: "Welcome to Voice of Unity!",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => step === 1 ? navigate("/") : setStep(1)}
        >
          <ArrowLeft size={20} />
        </Button>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <Music size={30} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Voice of Unity</h1>
            <p className="text-gray-500 mt-1">Create a new account</p>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
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
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="voiceType">Voice Type</Label>
                      <Select value={voiceType} onValueChange={setVoiceType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your voice type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="soprano">Soprano</SelectItem>
                          <SelectItem value="alto">Alto</SelectItem>
                          <SelectItem value="tenor">Tenor</SelectItem>
                          <SelectItem value="bass">Bass</SelectItem>
                          <SelectItem value="notSure">Not Sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="interests">Musical Interests</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Classical", "Gospel", "Jazz", "Contemporary", "Folk", "World"].map((interest) => (
                          <div key={interest} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={interest}
                              className="rounded border-gray-300 text-primary"
                            />
                            <Label htmlFor={interest} className="text-sm font-normal">
                              {interest}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {step === 1 ? "Continue" : isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm">
                <p className="text-gray-500">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Register;
