
import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Mail, User, LogOut, LogIn } from 'lucide-react';
import { NAV_LINKS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import mountainBg from '@assets/stock_images/colorado_front_range_68d549d2.jpg';
import logo from '@assets/Colorado_BizTech_Logo_1765824814070.jpg';

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { user, isAuthenticated, login, logout } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const success = await login(loginEmail, loginPassword);
    setIsLoggingIn(false);
    if (success) {
      setShowLoginDialog(false);
      setLoginEmail("");
      setLoginPassword("");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-600">
      {/* Mountain Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-white">
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat bg-bottom opacity-20"
          style={{ backgroundImage: `url(${mountainBg})`, filter: 'grayscale(100%)' }}
          role="img"
          aria-label="Colorado Front Range mountain landscape"
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-center gap-8">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer group">
              <img src={logo} alt="Colorado BizTech" className="h-14 w-auto" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map(link => (
              <Link key={link.id} href={link.id}>
                <div className={`text-sm font-medium transition-all cursor-pointer relative py-1 ${
                  location === link.id 
                    ? 'text-blue-600' 
                    : 'text-slate-600 hover:text-blue-600'
                }`}>
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200 ${
                    location === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </div>
              </Link>
            ))}
            <Link href="/subscribe">
              <Button size="sm" className="font-medium bg-blue-600 hover:bg-blue-700 text-white">
                Subscribe
              </Button>
            </Link>
            
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2" data-testid="button-user-menu">
                    <User className="h-4 w-4" />
                    <span className="max-w-[100px] truncate">{user.firstName || user.email.split('@')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm text-slate-500">
                    {user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer" data-testid="button-logout">
                    <LogOut className="h-4 w-4 mr-2" /> Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setShowLoginDialog(true)} data-testid="button-login">
                <LogIn className="h-4 w-4 mr-2" /> Log In
              </Button>
            )}
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden absolute right-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-700 hover:bg-slate-100">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white border-slate-200">
                <div className="flex flex-col gap-6 mt-10">
                  {NAV_LINKS.map(link => (
                    <Link key={link.id} href={link.id}>
                      <div className={`text-lg font-medium transition-colors cursor-pointer ${
                        location === link.id ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                      }`}>
                        {link.label}
                      </div>
                    </Link>
                  ))}
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => window.location.href = '/subscribe'}>Subscribe Now</Button>
                  {isAuthenticated && user ? (
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" /> Log Out ({user.firstName || user.email.split('@')[0]})
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" onClick={() => setShowLoginDialog(true)}>
                      <LogIn className="h-4 w-4 mr-2" /> Log In
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900 text-slate-400 py-16 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <img src={logo} alt="Colorado BizTech" className="h-16 w-auto" />
              </div>
              <p className="max-w-md mb-6 leading-relaxed">
                News and analysis on the deep tech ecosystem transforming our economy.
              </p>
              <div className="flex gap-4">
                <a href="mailto:Dan@ColoradoBizTech.com" className="hover:text-blue-400 transition-colors" aria-label="Email"><Mail size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map(link => (
                  <li key={link.id}>
                    <Link href={link.id}><span className="hover:text-blue-400 transition-colors cursor-pointer">{link.label}</span></Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Connect</h4>
              <ul className="space-y-3">
                <li><a href="mailto:Dan@ColoradoBizTech.com?subject=Colorado%20BizTech%20Inquiry" className="hover:text-blue-400 transition-colors cursor-pointer">Contact Us</a></li>
                <li><Link href="/subscribe"><span className="hover:text-blue-400 transition-colors cursor-pointer">Get the Report</span></Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; 2025 Colorado BizTech. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log In</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="you@example.com"
                required
                data-testid="input-login-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
                required
                data-testid="input-login-password"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoggingIn} data-testid="button-submit-login">
              {isLoggingIn ? "Logging in..." : "Log In"}
            </Button>
            <p className="text-sm text-center text-slate-500">
              Don't have an account?{" "}
              <Link href="/subscribe" onClick={() => setShowLoginDialog(false)}>
                <span className="text-blue-600 hover:underline cursor-pointer">Sign up</span>
              </Link>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
