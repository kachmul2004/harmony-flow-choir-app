import React, { useState } from "react";
import { Edit2, LogOut, CreditCard, Bell, Settings, User, Music, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import MusicPlayer from "@/components/MusicPlayer";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { payments } from "@/data/mockData";

const Profile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  if (!user) return null;
  
  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title="Profile" />
      
      <main className="p-4 space-y-4">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-3 border-2 border-white shadow">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <Badge className="mt-1">{user.role}</Badge>
          
          <Button
            variant="outline"
            size="sm"
            className="mt-4 text-gray-600"
            onClick={() => navigate('/edit-profile')}
          >
            <Edit2 size={14} className="mr-1" /> Edit Profile
          </Button>
        </div>
        
        <Tabs defaultValue="profile" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <User size={16} className="mr-2" /> Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email</span>
                    <span>{user.email}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-500">Member Since</span>
                    <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-500">Voice Type</span>
                    <span>{user.role}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Music size={16} className="mr-2" /> Musical Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {user.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Users size={16} className="mr-2" /> Choir Memberships
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                {user.choirMemberships.map((choir, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{choir}</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <CreditCard size={16} className="mr-2" /> Payment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium text-sm">{payment.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(payment.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${payment.amount}</p>
                        <Badge 
                          variant={payment.status === 'paid' ? "secondary" : payment.status === 'pending' ? "outline" : "destructive"}
                          className="text-xs"
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Settings size={16} className="mr-2" /> App Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Notifications</div>
                    <div className="text-xs text-gray-500">Manage notification preferences</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Bell size={14} className="mr-1" /> Configure
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Account Security</div>
                    <div className="text-xs text-gray-500">Update password and security settings</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings size={14} className="mr-1" /> Manage
                  </Button>
                </div>
                
                <Separator />
                
                <Button 
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <LogOut size={16} className="mr-2" /> Sign Out
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <MusicPlayer />
      <BottomNavigation />
    </div>
  );
};

export default Profile;
