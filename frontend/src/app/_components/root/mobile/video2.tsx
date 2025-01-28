export function Video2({ src }: { src: string }) {
  return (
    <video
      className="w-full h-[574px] object-cover  "
      autoPlay
      playsInline
      loop
      muted
      preload="auto"
    >
      <source src={`${src}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
