
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FoodVideos = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  
  const videos = [
    {
      id: 1,
      title: "Quick & Easy Butter Chicken",
      description: "Learn how to make delicious butter chicken in under 30 minutes",
      url: "https://www.youtube.com/embed/pqpDYRZ3pYQ",
    },
    {
      id: 2,
      title: "Authentic Biryani Recipe",
      description: "Master the art of making authentic biryani at home",
      url: "https://www.youtube.com/embed/nC5IFSnluZY",
    },
    {
      id: 3,
      title: "Homemade Naan Bread Recipe",
      description: "Make soft and fluffy naan bread from scratch",
      url: "https://www.youtube.com/embed/0n47msSQllA",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Cooking Videos</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src={videos[activeVideo].url}
              title={videos[activeVideo].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{videos[activeVideo].title}</h2>
            <p className="text-gray-600 mt-2">{videos[activeVideo].description}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">More Videos</h3>
          
          {videos.map((video, index) => (
            <Card 
              key={video.id} 
              className={`cursor-pointer transition-all ${activeVideo === index ? 'border-2 border-primary' : 'hover:shadow-md'}`}
              onClick={() => setActiveVideo(index)}
            >
              <CardHeader className="p-4">
                <CardTitle className="text-md">{video.title}</CardTitle>
                <CardDescription className="line-clamp-2">{video.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodVideos;
