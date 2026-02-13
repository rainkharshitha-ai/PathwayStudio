import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import "./Gallery.css";

/* VIDEOS */
import v1 from "./ModelingGallery/Gallery1.mp4";
import v4 from "./ModelingGallery/Gallery4.mp4";
import v5 from "./ModelingGallery/Gallery5.mp4";
import v6 from "./ModelingGallery/Gallery6.mp4";
import v7 from "./ModelingGallery/Gallery7.mp4";
import v8 from "./ModelingGallery/Gallery8.mp4";
import v9 from "./ModelingGallery/Gallery9.mp4";

/* IMAGES */
import i2 from "./ModelingGallery/Gallery2.jpg";
import i3 from "./ModelingGallery/Gallery3.jpg";
import i10 from "./ModelingGallery/Gallery10.jpg";
import i11 from "./ModelingGallery/Gallery11.jpg";
import i12 from "./ModelingGallery/Gallery12.jpg";
import i13 from "./ModelingGallery/Gallery13.jpg";
import i14 from "./ModelingGallery/Gallery14.jpeg";
import i15 from "./ModelingGallery/Gallery15.jpg";

export default function Gallery() {
  const [filter, setFilter] = useState("image");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  /* MASTER GALLERY */
  const galleryItems = [
    { type: "video", src: v1, slide: { type: "video", sources: [{ src: v1, type: "video/mp4" }] } },
    { type: "video", src: v4, slide: { type: "video", sources: [{ src: v4, type: "video/mp4" }] } },
    { type: "video", src: v5, slide: { type: "video", sources: [{ src: v5, type: "video/mp4" }] } },
    { type: "video", src: v6, slide: { type: "video", sources: [{ src: v6, type: "video/mp4" }] } },
    { type: "video", src: v7, slide: { type: "video", sources: [{ src: v7, type: "video/mp4" }] } },
    { type: "video", src: v8, slide: { type: "video", sources: [{ src: v8, type: "video/mp4" }] } },
    { type: "video", src: v9, slide: { type: "video", sources: [{ src: v9, type: "video/mp4" }] } },

    { type: "image", src: i2, slide: { src: i2 } },
    { type: "image", src: i3, slide: { src: i3 } },
    { type: "image", src: i10, slide: { src: i10 } },
    { type: "image", src: i11, slide: { src: i11 } },
    { type: "image", src: i12, slide: { src: i12 } },
    { type: "image", src: i13, slide: { src: i13 } },
    { type: "image", src: i14, slide: { src: i14 } },
    { type: "image", src: i15, slide: { src: i15 } },
  ];

  const filteredItems = galleryItems.filter(
    (item) => item.type === filter
  );

  const slides = galleryItems.map((item) => item.slide);

  return (
    <>
      <section className="gallery-page">
        {/* TITLE */}
        <h1 className="gallery-title">Modeling Portfolio</h1>

        {/* TOGGLE */}
        <div className="gallery-tabs">
          {["image", "video"].map((t) => (
            <button
              key={t}
              className={filter === t ? "active" : ""}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="gallery-grid">
          {filteredItems.map((item, i) => {
            const realIndex = galleryItems.indexOf(item);

            return (
              <div
                key={i}
                className="gallery-card"
                onClick={() => {
                  setIndex(realIndex);
                  setOpen(true);
                }}
              >
                {item.type === "image" ? (
                  <img src={item.src} alt="" />
                ) : (
                  <video src={item.src} muted />
                )}
                <div className="overlay">VIEW</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FULL SCREEN POPUP */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Video]}
      />
    </>
  );
}
