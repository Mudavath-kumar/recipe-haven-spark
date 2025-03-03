
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";

const FoodVideos = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  
  const videos = [
    {
      id: 1,
      title: "Quick & Easy Butter Chicken",
      description: "Learn how to make delicious butter chicken in under 30 minutes",
      url: "https://www.youtube.com/embed/pqpDYRZ3pYQ",
      thumbnail: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: 2,
      title: "Authentic Biryani Recipe",
      description: "Master the art of making authentic biryani at home",
      url: "https://www.youtube.com/embed/nC5IFSnluZY",
      thumbnail: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: 3,
      title: "Homemade Naan Bread Recipe",
      description: "Make soft and fluffy naan bread from scratch",
      url: "https://www.youtube.com/embed/0n47msSQllA",
      thumbnail: "https://images.unsplash.com/photo-1593750391398-48ddd9909322?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: 4,
      title: "Perfect Pasta Carbonara",
      description: "Learn to make the classic Italian pasta carbonara with a creamy sauce",
      url: "https://www.youtube.com/embed/qoHnwOHLiMk",
      thumbnail: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: 5,
      title: "Chocolate Soufflé Masterclass",
      description: "Create a restaurant-quality chocolate soufflé at home",
      url: "https://www.youtube.com/embed/vWGvZnb50eY",
      thumbnail: "https://images.unsplash.com/photo-1615559108290-52586aa2d9d2?auto=format&fit=crop&q=80&w=500"
    }
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
              className={`cursor-pointer transition-all hover:shadow-md ${activeVideo === index ? 'border-2 border-primary' : ''}`}
              onClick={() => setActiveVideo(index)}
            >
              <div className="flex flex-row items-center p-3">
                <div className="relative w-24 h-16 mr-3 flex-shrink-0 rounded-md overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  {activeVideo !== index && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <CardTitle className="text-md">{video.title}</CardTitle>
                  <CardDescription className="line-clamp-1 text-xs">{video.description}</CardDescription>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodVideos;
