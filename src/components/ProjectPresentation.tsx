
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProjectPresentation = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Recipe Haven - Project Documentation</h1>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="problem">Problem</TabsTrigger>
          <TabsTrigger value="solution">Solution</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="model">Model</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="conclusion">Conclusion</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>A high-level view of Recipe Haven</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold">Recipe Haven</h3>
              <p>
                Recipe Haven is a comprehensive web application designed to provide users with a seamless cooking experience. 
                The platform offers a rich collection of recipes from various cuisines, interactive cooking videos, and user-friendly 
                features to enhance the home cooking journey. With an emphasis on visual presentation and detailed instructions, 
                Recipe Haven aims to make cooking accessible and enjoyable for users of all skill levels.
              </p>
              <p>
                The application serves as a digital cookbook, featuring a diverse range of recipes categorized by cuisine, difficulty level, 
                and preparation time. Users can browse through the collection, search for specific dishes, watch instructional videos, 
                and save their favorite recipes for future reference.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="problem" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Problem Statement</CardTitle>
              <CardDescription>The challenges we aim to address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Despite the abundance of cooking resources available online, many users struggle with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Finding reliable recipes with detailed instructions</li>
                <li>Accessing high-quality visual references for dishes</li>
                <li>Getting exposure to diverse cuisines and cooking techniques</li>
                <li>Understanding the complexity and time requirements of recipes before starting</li>
                <li>Locating recipes based on available ingredients or dietary preferences</li>
                <li>Maintaining a personal collection of favorite recipes across different sources</li>
              </ul>
              <p>
                These challenges often lead to frustration, wasted ingredients, and a reluctance to experiment 
                with new dishes, limiting the culinary experiences of home cooks.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="solution" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Proposed Solution</CardTitle>
              <CardDescription>How Recipe Haven addresses these challenges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Recipe Haven offers a comprehensive solution through these key features:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Extensive Recipe Database:</strong> A curated collection of recipes from various cuisines, 
                  complete with high-quality images, detailed instructions, and ingredient lists.
                </li>
                <li>
                  <strong>Visual Recipe Cards:</strong> Clean, visually appealing recipe cards with at-a-glance 
                  information about preparation time, serving size, and dietary category.
                </li>
                <li>
                  <strong>Instructional Videos:</strong> A dedicated video section with step-by-step cooking 
                  demonstrations for popular dishes.
                </li>
                <li>
                  <strong>User Authentication:</strong> Personalized experience with user accounts, allowing for 
                  saving favorite recipes and tracking cooking history.
                </li>
                <li>
                  <strong>Responsive Design:</strong> A mobile-friendly interface that works seamlessly across devices, 
                  making it convenient to access recipes in the kitchen.
                </li>
                <li>
                  <strong>Search and Filter:</strong> Advanced search functionality with filters for cuisine, 
                  preparation time, and dietary preferences.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="technology" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Technologies Used</CardTitle>
              <CardDescription>The technical stack powering Recipe Haven</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Frontend</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>React:</strong> For building the user interface with reusable components</li>
                    <li><strong>TypeScript:</strong> For type-safe code and enhanced developer experience</li>
                    <li><strong>Tailwind CSS:</strong> For responsive and customized styling</li>
                    <li><strong>shadcn/ui:</strong> For consistent and accessible UI components</li>
                    <li><strong>React Router:</strong> For client-side routing and navigation</li>
                    <li><strong>Vite:</strong> For fast development and optimized builds</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Backend & Services</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Supabase:</strong> For authentication, database, and storage</li>
                    <li><strong>PostgreSQL:</strong> As the database for storing recipe information</li>
                    <li><strong>RESTful APIs:</strong> For data fetching and management</li>
                    <li><strong>Tanstack Query:</strong> For efficient data fetching and state management</li>
                    <li><strong>Recharts:</strong> For data visualization</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="model" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Modeling</CardTitle>
              <CardDescription>Architecture and data flow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">Application Architecture</h3>
              <p>
                Recipe Haven follows a modern client-server architecture with clear separation of concerns:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Presentation Layer:</strong> React components responsible for rendering the UI and handling user interactions
                </li>
                <li>
                  <strong>State Management Layer:</strong> Using React Context and Tanstack Query for managing application state
                </li>
                <li>
                  <strong>Service Layer:</strong> Responsible for API communication and data processing
                </li>
                <li>
                  <strong>Data Layer:</strong> Supabase and PostgreSQL for data persistence
                </li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-6">Data Model</h3>
              <p>
                The core entities in our system include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Recipes:</strong> Contains recipe details, ingredients, instructions, and metadata
                </li>
                <li>
                  <strong>Users:</strong> User profiles and authentication information
                </li>
                <li>
                  <strong>Categories:</strong> Classification of recipes by cuisine type
                </li>
                <li>
                  <strong>Videos:</strong> Cooking demonstrations and tutorials
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Results</CardTitle>
              <CardDescription>Key outcomes and metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The implementation of Recipe Haven has achieved several significant outcomes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Rich Recipe Database:</strong> Successfully implemented a database with over 20 detailed recipes 
                  across multiple cuisines, complete with high-quality images and step-by-step instructions.
                </li>
                <li>
                  <strong>Responsive UI:</strong> Achieved a responsive design that adapts seamlessly to various screen sizes, 
                  with performance optimization for mobile devices.
                </li>
                <li>
                  <strong>Video Integration:</strong> Successfully incorporated cooking videos with thumbnails and 
                  interactive player controls.
                </li>
                <li>
                  <strong>User Authentication:</strong> Implemented secure user authentication with features for 
                  account creation, login, and password recovery.
                </li>
                <li>
                  <strong>Search Functionality:</strong> Developed efficient search capabilities allowing users to 
                  find recipes by name, ingredients, or cuisine type.
                </li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-6">Performance Metrics</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Average page load time: &lt; 2 seconds</li>
                <li>Mobile responsiveness: Optimized for devices down to 320px width</li>
                <li>Accessibility compliance: WCAG 2.1 AA standards</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conclusion" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Conclusion & Future Work</CardTitle>
              <CardDescription>Summary and next steps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">Project Summary</h3>
              <p>
                Recipe Haven has successfully delivered a comprehensive cooking platform that addresses the identified 
                challenges faced by home cooks. By providing detailed recipes, instructional videos, and a user-friendly 
                interface, the application enhances the cooking experience and encourages culinary exploration.
              </p>
              <p>
                The implementation of modern web technologies has enabled a responsive, performant application that 
                works across devices, making recipes accessible whether planning meals or cooking in the kitchen.
              </p>
              
              <h3 className="text-lg font-semibold mt-6">Future Enhancements</h3>
              <p>
                While Recipe Haven already offers a robust set of features, several enhancements could further improve the platform:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>User-Generated Content:</strong> Allow users to submit their own recipes and cooking tips
                </li>
                <li>
                  <strong>Social Features:</strong> Implement comments, ratings, and sharing functionality
                </li>
                <li>
                  <strong>Meal Planning:</strong> Add features for creating weekly meal plans and generating shopping lists
                </li>
                <li>
                  <strong>Nutritional Information:</strong> Include detailed nutritional data for each recipe
                </li>
                <li>
                  <strong>Recipe Scaling:</strong> Automatically adjust ingredient quantities based on desired serving size
                </li>
                <li>
                  <strong>Offline Support:</strong> Implement Progressive Web App (PWA) capabilities for offline access
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectPresentation;
