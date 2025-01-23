export function Video({ src }: { src: string }) {
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
        {/* <track
          src=""
          kind="subtitles"
          srcLang="en"
          label="English"
        /> */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
