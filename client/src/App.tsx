
import { Switch, Route, Router, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout";
import { AuthProvider } from "@/hooks/use-auth";
import Home from "@/pages/home";
import NewsPage from "@/pages/news";
import ResearchPage from "@/pages/research";
import ResourcesPage from "@/pages/resources";
import SubscribePage from "@/pages/subscribe";
import SurveyPage from "@/pages/survey";
import RoadmapPage from "@/pages/roadmap";
import BizTech100Page from "@/pages/biztech100";
import DashboardPage from "@/pages/dashboard";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/biztech100" component={BizTech100Page} />
              <Route path="/news" component={NewsPage} />
              <Route path="/research" component={ResearchPage} />
              <Route path="/resources" component={ResourcesPage} />
              <Route path="/subscribe" component={SubscribePage} />
              <Route path="/survey" component={SurveyPage} />
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/roadmap" component={RoadmapPage} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </Router>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
