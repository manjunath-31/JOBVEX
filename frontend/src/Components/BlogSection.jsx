import { useEffect, useState } from "react";
import { BookOpen, Clock, Calendar, ArrowRight, X } from "lucide-react";

export default function BlogSection({ blogs = [] }) {
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    if (!selectedBlog) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") setSelectedBlog(null);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedBlog]);

  return (
    <div className="blog-section-container">
      <div className="blog-header">
        <div className="blog-tag">
          <BookOpen size={16} /> Placement Resources & Prep
        </div>
        <h1>
          JOBVEX <span className="gradient-text">Career & Interview Blog</span>
        </h1>
        <p>
          Curated guides on technical interview questions, ATS resume optimization, off-campus drive updates, and negotiation tactics for freshers.
        </p>
      </div>

      <div className="blog-grid">
        {blogs.map((blog) => (
          <article key={blog.id} className="blog-card">
            <div className="blog-card-meta">
              <span className="category-tag">{blog.category}</span>
              <span className="read-time"><Clock size={12} /> {blog.readTime}</span>
            </div>
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-snippet">{blog.snippet}</p>
            <div className="blog-footer">
              <span className="blog-date"><Calendar size={13} /> {blog.date}</span>
              <button
                type="button"
                className="read-more-btn"
                onClick={() => setSelectedBlog(blog)}
              >
                Read Article <ArrowRight size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedBlog && (
        <div
          className="blog-reader-backdrop"
          role="presentation"
          onClick={() => setSelectedBlog(null)}
        >
          <article
            className="blog-reader-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-reader-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="blog-reader-header">
              <div>
                <span className="category-tag">{selectedBlog.category}</span>
                <h2 id="blog-reader-title">{selectedBlog.title}</h2>
                <div className="blog-reader-meta">
                  <span><Calendar size={14} /> {selectedBlog.date}</span>
                  <span><Clock size={14} /> {selectedBlog.readTime}</span>
                </div>
              </div>
              <button
                type="button"
                className="blog-reader-close"
                aria-label="Close article"
                onClick={() => setSelectedBlog(null)}
              >
                <X size={20} />
              </button>
            </header>

            <div className="blog-reader-content">
              {(selectedBlog.content || selectedBlog.body || selectedBlog.article || selectedBlog.snippet)
                .split("\n")
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={`${selectedBlog.id}-paragraph-${index}`}>{paragraph}</p>
                ))}
            </div>

            <footer className="blog-reader-footer">
              <span>Keep learning with JOBVEX career resources.</span>
              <button
                type="button"
                className="blog-reader-done"
                onClick={() => setSelectedBlog(null)}
              >
                Done
              </button>
            </footer>
          </article>
        </div>
      )}
    </div>
  );
}
