
const FoodVideos = () => {
  const videos = [
    {
      id: 1,
      title: "Making Perfect Butter Chicken",
      url: "https://player.vimeo.com/video/467588807?autoplay=1&loop=1&muted=1",
    },
    {
      id: 2,
      title: "Traditional Biryani Preparation",
      url: "https://player.vimeo.com/video/467588807?autoplay=1&loop=1&muted=1",
    },
    {
      id: 3,
      title: "Mastering Indian Breads",
      url: "https://player.vimeo.com/video/467588807?autoplay=1&loop=1&muted=1",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="grid grid-cols-1 gap-8">
        {videos.map((video) => (
          <div key={video.id} className="relative h-screen w-full">
            <iframe
              src={video.url}
              className="absolute inset-0 w-full h-full object-cover"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute bottom-8 left-8 text-white z-10">
              <h2 className="text-4xl font-bold mb-2 font-playfair">{video.title}</h2>
              <div className="bg-black/50 px-4 py-2 rounded-full inline-block font-poppins">
                Scroll for more videos
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodVideos;
