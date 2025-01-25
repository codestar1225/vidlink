export function Video1({ src }: { src: string }) {
  return (
    <div className="overflow-hidden h-screen w-screen ">
      <video
        className="h-screen min-w-full object-cover absolute -left-[0px] "
        autoPlay
        playsInline
        loop
        muted
        preload="auto"
      >
        <source src={`${src}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
